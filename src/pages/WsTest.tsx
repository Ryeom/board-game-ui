import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWebSocket } from "@/context/WebSocketContext";

export default function WebSocketClient() {
    const socketRef = useRef<WebSocket | null>(null);
    const [log, setLog] = useState<string[]>([]);
    const [roomId, setRoomId] = useState("test-room");
    const [name, setName] = useState("tester");
    const { send, logs, isConnected } = useWebSocket();

    const addLog = (message: string) => {
        setLog((prev) => [message, ...prev]);
    };

    const sendEvent = (type: string) => {
        const payload = JSON.stringify({
            type,
            roomId,
            name,
        });
        socketRef.current?.send(payload);
        addLog(`📤 Sent: ${payload}`);
    };

    return (
        <main className="min-h-screen bg-gray-50 text-gray-800">
            <header className="bg-white shadow-md px-6 py-4 mb-6">
                <h2 className="text-xl font-semibold">WebSocket 테스트 클라이언트</h2>
            </header>

            <section className="max-w-xl mx-auto space-y-4 p-4">
                <div className="flex gap-2 items-center">
                    <Input placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                    <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Button
                        variant={isConnected ? "default" : "destructive"}
                        onClick={() => addLog(isConnected ? "✅ 연결됨" : "❌ 연결 안 됨")}
                    >
                        연결 상태
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => sendEvent("create_room")}>Create Room</Button>
                    <Button onClick={() => sendEvent("join_room")}>Join Room</Button>
                </div>
                <div className="bg-white p-3 rounded border h-60 overflow-auto text-sm">
                    {log.map((entry, i) => (
                        <div key={i}>{entry}</div>
                    ))}
                </div>
            </section>
        </main>
    );
}
