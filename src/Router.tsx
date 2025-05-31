import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Lobby from "@/pages/Lobby";
import WebSocketClient from "@/pages/WsTest";
import Login from "@/pages/Login";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/test" element={<WebSocketClient />} />
            <Route path="/lobby" element={<Lobby />} />
        </Routes>
    );
}
