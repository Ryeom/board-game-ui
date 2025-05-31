import { useParams } from "react-router-dom";

export default function Room() {
    const { id } = useParams();

    return (
        <main className="min-h-screen bg-gray-100 text-gray-800 p-4">
            <h1 className="text-2xl font-bold mb-4">Room: {id}</h1>
            <p>게임 진행 영역입니다. (준비 중)</p>
        </main>
    );
}