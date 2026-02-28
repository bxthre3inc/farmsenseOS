'use client';

import { useEffect, useRef, useState } from 'react';
import { useCCStore } from '@/store/useCCStore';

interface TelemetryPayload {
    type: 'RSS_UPDATE' | 'DHU_UPDATE' | 'LEDGER_UPDATE' | 'FLEET_UPDATE';
    data: any;
}

export function useRealtimeTelemetry(enabled: boolean = true) {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const updateRSS = useCCStore((state) => state.updateRSS);
    const updateDHU = useCCStore((state) => state.updateDHU);

    useEffect(() => {
        if (!enabled) return;

        const connect = () => {
            // In a real production environment, we'd fetch the JWT from the session
            // For MVP local dev, we assume the backend might have a bypass or we pass a mock token
            const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws?token=mock-mvp-token';

            const ws = new WebSocket(wsUrl);
            socketRef.current = ws;

            ws.onopen = () => {
                console.log('📡 [TELEMETRY] Connected to RSS Oracle WebSocket');
                setIsConnected(true);
            };

            ws.onmessage = (event) => {
                try {
                    const payload: TelemetryPayload = JSON.parse(event.data);

                    switch (payload.type) {
                        case 'RSS_UPDATE':
                            updateRSS(payload.data);
                            break;
                        case 'DHU_UPDATE':
                            updateDHU(payload.data.id, payload.data);
                            break;
                        default:
                            console.log('✉️ [TELEMETRY] Received unhandled payload type:', payload.type);
                    }
                } catch (err) {
                    console.error('❌ [TELEMETRY] Failed to parse WebSocket message:', err);
                }
            };

            ws.onclose = () => {
                console.warn('⚠️ [TELEMETRY] WebSocket closed. Attempting reconnect in 5s...');
                setIsConnected(false);
                setTimeout(connect, 5000);
            };

            ws.onerror = (err) => {
                console.error('❌ [TELEMETRY] WebSocket Error:', err);
                ws.close();
            };
        };

        connect();

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [enabled, updateRSS, updateDHU]);

    return { isConnected };
}
