'use client';

import { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

interface TerrainData {
  elevation: number[][];
  size: number;
  resolution: string;
}

export function TerrainMesh() {
  const [terrainData, setTerrainData] = useState<TerrainData | null>(null);

  useEffect(() => {
    // Fetch 1m DEM from the Oracle backend
    // In production, field_id would be dynamic
    fetch('http://localhost:8000/api/v1/analytics/terrain/field-sub1')
      .then(res => res.json())
      .then(data => setTerrainData(data))
      .catch(err => console.error("Failed to fetch terrain data:", err));
  }, []);

  const geometry = useMemo(() => {
    if (!terrainData) return null;

    const { elevation, size } = terrainData;
    const width = size;
    const height = size;
    
    const geometry = new THREE.PlaneGeometry(width, height, width - 1, height - 1);
    const vertices = geometry.attributes.position.array as Float32Array;

    // Apply elevation data to the Z-axis (which will be Y after rotation)
    for (let i = 0; i < vertices.length; i += 3) {
        const x_idx = Math.floor((i / 3) % width);
        const y_idx = Math.floor((i / 3) / width);
        
        if (elevation[y_idx] && elevation[y_idx][x_idx] !== undefined) {
            // Subtract base elevation and scale for visual effect
            const base = 2336.0;
            vertices[i + 2] = (elevation[y_idx][x_idx] - base) * 2.0; 
        }
    }

    geometry.computeVertexNormals();
    return geometry;
  }, [terrainData]);

  if (!geometry) return null;

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* High-Fidelity Topographic Mesh */}
      <mesh geometry={geometry} receiveShadow castShadow>
        <meshStandardMaterial 
          color="#020617" 
          roughness={0.8}
          metalness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Tactical Wireframe Overlay */}
      <mesh geometry={geometry} position={[0, 0, 0.05]}>
        <meshBasicMaterial 
          color="#1e293b" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>
    </group>
  );
}
