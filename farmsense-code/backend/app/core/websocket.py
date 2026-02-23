from typing import List
from fastapi import WebSocket

class ConnectionManager:
    """Manages active WebSocket connections for real-time frontend updates."""
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            
    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                # Connection might have closed unexpectedly
                pass

# Global singleton instance for importing across routers
manager = ConnectionManager()
