
import React, { useMemo, useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import Map, { Source, Layer, NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import mapStyle from '../../styles/agri-map-style.json';
import { api } from '../../services/api';

// Types for props (can be expanded)
interface AgriMapProps {
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    isEnterprise?: boolean;
}

const AgriMap: React.FC<AgriMapProps> = ({
    initialViewState = {
        longitude: -105.00, // Matching demo seed data
        latitude: 40.00,
        zoom: 14
    },
    isEnterprise = false
}) => {
    const [gridData, setGridData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(initialViewState.zoom);
    
    const showResolutionPop = zoomLevel >= 15.5 && !isEnterprise;

    useEffect(() => {
        const fetchGrid = async () => {
            setLoading(true);
            try {
                // Fetching 20m grid for field_demo_001
                const data = await api.get20mGrid('field_demo_001');

                // Convert to GeoJSON
                const geojson = {
                    type: 'FeatureCollection',
                    features: data.map((point: any) => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [point.longitude, point.latitude]
                        },
                        properties: {
                            moisture: point.moisture_surface,
                            stress: point.stress_index,
                            id: point.grid_id
                        }
                    }))
                };
                setGridData(geojson);
            } catch (error) {
                console.error('Failed to fetch grid data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGrid();
    }, []);

    const style = useMemo(() => {
        return mapStyle as any; // Type assertion for MapLibre style compatibility
    }, []);

    return (
        <div className="w-full h-full relative">
            <Map
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle={style}
                onMove={evt => setZoomLevel(evt.viewState.zoom)}
            >
                <NavigationControl position="top-right" />
                <ScaleControl />

                {gridData && (
                    <Source id="grid-source" type="geojson" data={gridData}>
                        <Layer
                            id="grid-layer"
                            type="circle"
                            paint={{
                                'circle-radius': 8,
                                'circle-color': [
                                    'interpolate',
                                    ['linear'],
                                    ['get', 'moisture'],
                                    0, '#ff0000',
                                    0.5, '#ffff00',
                                    1, '#00ff00'
                                ],
                                'circle-opacity': 0.7,
                                'circle-stroke-width': 1,
                                'circle-stroke-color': '#fff'
                            }}
                        />
                    </Source>
                )}
            </Map>

            {showResolutionPop && (
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                    <div className="bg-emerald-500/20 p-4 rounded-full mb-4 ring-1 ring-emerald-500/50 shadow-2xl shadow-emerald-500/20">
                        <Lock className="w-12 h-12 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-black mb-2 text-white tracking-tight drop-shadow-md">
                        1M HIGH-RESOLUTION AERIAL AUDIT
                    </h2>
                    <p className="text-slate-300 font-medium mb-6 max-w-lg leading-relaxed drop-shadow-sm">
                        Zo has detected a multispectral variance in this sector via the Aerial Fleet. 
                        Upgrade to Enterprise to unlock <strong className="text-white">0.7cm/px M3M orthomosaics</strong> and verify the ground truth.
                    </p>
                    <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold tracking-widest uppercase rounded shadow-lg shadow-emerald-900/50 text-white transition-all active:scale-95 border border-emerald-400/50">
                        Unlock Enterprise Data
                    </button>
                </div>
            )}

            {/* Overlay controls or legend could go here */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded shadow-lg z-10 opacity-90">
                <h3 className="font-bold text-lg text-green-800">FarmSense Field View</h3>
                <p className="text-sm text-gray-600">Region: North Field (Demo)</p>
                {loading && <p className="text-xs text-blue-500 animate-pulse">Loading grid data...</p>}
                {!loading && gridData && (
                    <p className="text-xs text-gray-500">{gridData.features.length} virtual points active</p>
                )}
                <div className="mt-4 text-xs">
                    <p className="font-semibold mb-1">Moisture Levels</p>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#00ff00] border border-gray-300 block"></span>
                            <span>Optimal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#ffff00] border border-gray-300 block"></span>
                            <span>Moderate</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 bg-[#ff0000] border border-gray-300 block"></span>
                            <span>Alert</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgriMap;
