import { createContext, useContext, useEffect, useRef, useState } from "react";

interface WebSocketContextType {
    isConnected: boolean;
    send: (data: any) => void;
    logs: string[];
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const addLog = (msg: string) => setLogs((prev) => [msg, ...prev]);

    useEffect(() => {
        console.log("웹소켓을 연결할테야!")
        socketRef.current = new WebSocket("ws://localhost:8080/board-game/ws");

        socketRef.current.onopen = () => {
            setIsConnected(true);
            addLog("✅ WebSocket connected");

            const userName = localStorage.getItem("userName") ?? "익명";

            const payload = JSON.stringify({
                type: "identify",
                name: userName,
            });

            socketRef.current?.send(payload);
            addLog(`📤 Sent (identify): ${payload}`);
        };


        socketRef.current.onmessage = (e) => {
            addLog(`📩 ${e.data}`)
            console.log("받음 : ", e.data)
        };
        socketRef.current.onerror = () => {
            setIsConnected(false);
            addLog("❌ WebSocket error");
        };
        socketRef.current.onclose = () => {
            setIsConnected(false);
            addLog("🔌 WebSocket disconnected");
        };

        return () => socketRef.current?.close();
    }, []);

    const send = (data: any) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            const msg = typeof data === "string" ? data : JSON.stringify(data);
            socketRef.current.send(msg);
            addLog(`📤 Sent: ${msg}`);
            console.log("보냄 : ", msg)
        } else {
            addLog("⚠️ WebSocket not connected");
        }
    };

    return (
        <WebSocketContext.Provider value={{ isConnected, send, logs }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const ctx = useContext(WebSocketContext);
    if (!ctx) throw new Error("WebSocket context not available!");
    return ctx;
};
