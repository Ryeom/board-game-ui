// LoginAndLobby.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAndLobby = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id.trim()) {
            localStorage.setItem("userName", id);
            navigate("/lobby");
        } else {
            alert("ID는 필수입니다!");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">로그인</h1>
            <input
                type="text"
                placeholder="ID"
                className="border p-2 w-64"
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <input
                type="password"
                placeholder="비밀번호"
                className="border p-2 w-64"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
            />
            <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
                입장하기
            </button>
        </div>
    );
};

export default LoginAndLobby;
