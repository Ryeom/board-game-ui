import { useWebSocket } from "@/context/WebSocketContext";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface RoomInfo {
    id: string;
    host: string;
    playerCount: number;
    gameMode: string;
    createdAt: string;
}

export default function Lobby() {
    const { send, logs, isConnected } = useWebSocket();
    const [rooms, setRooms] = useState<RoomInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        send({ type: "get_room_list" });
    }, []);

    useEffect(() => {
        const last = logs[0];
        try {
            const parsed = JSON.parse(last);
            if (parsed.type === "room_list") {
                setRooms(parsed.data);
            } else if (parsed.type === "room_created" && parsed.data?.roomId) {
                navigate(`/room/${parsed.data.roomId}`);
                // 방 만들기 후 다시 방 목록 요청
                send({ type: "get_room_list" }); // 유의
            }
        } catch (_) { }
    }, [logs]);

    return (
        <main className="min-h-screen bg-gray-50 text-gray-800 p-4">
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">게임 로비</h1>
                <Button
                    disabled={!isConnected}
                    onClick={() => send({ type: "create_room" })}
                >
                    + 방 만들기
                </Button>
            </header>

            <section className="space-y-3">
                {rooms.length === 0 ? (
                    <p className="text-gray-500">현재 참여 가능한 방이 없습니다.</p>
                ) : (
                    rooms.map((room) => (
                        <div key={room.id} className="p-4 border rounded shadow-sm bg-white">
                            <div className="font-semibold">{room.id}</div>
                            <div className="text-sm text-gray-600">Host: {room.host}</div>
                            <div className="text-sm text-gray-600">Players: {room.playerCount}</div>
                            <div className="text-sm text-gray-600">Game: {room.gameMode}</div>
                            <div className="text-sm text-gray-400">
                                Since: {new Date(room.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                )}
            </section>
        </main>
    );
}
