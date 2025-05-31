// App.tsx
import { useLocation } from "react-router-dom";
import AppRouter from "./Router";
import { WebSocketProvider } from "@/context/WebSocketContext";
import TopBar from "@/pages/TopBar";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const userName = localStorage.getItem("userName") ?? "";

  return isLoginPage ? <AppRouter /> : (
    <WebSocketProvider>
      <TopBar />
      <AppRouter />
    </WebSocketProvider>
  );
}

export default App;
