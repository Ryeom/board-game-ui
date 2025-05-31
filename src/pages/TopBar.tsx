// TopBar.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "@/context/WebSocketContext";

const TopBar = () => {
    const navigate = useNavigate();
    const { isConnected } = useWebSocket();
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("userName") ?? "";
        setUserName(name);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userName");
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-sm border-b">
            <div className="flex items-center gap-2">
                {/* <img
                    src={`https://api.dicebear.com/8.x/pixel-art/svg?seed=${userName}`}
                    alt="avatar"
                    className="w-4 h-4 rounded-full"
                /> */}
                <span>{userName}님 안녕하세요</span>
                <span className={`ml-2 text-xs font-semibold ${isConnected ? "text-green-600" : "text-red-500"}`}>
                    {isConnected ? "● 연결됨" : "○ 연결 안됨"}
                </span>
            </div>
            <button onClick={handleLogout} className="text-gray-600 hover:text-black text-xs">
                로그아웃
            </button>
        </div>
    );
};

export default TopBar;
