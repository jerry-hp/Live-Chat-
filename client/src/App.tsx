import { useState } from "react";
import ChatRoom from "./ChatRoom";
import io from "socket.io-client";

function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const socket = io("http://localhost:3000");

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      // setShowChat(true);
    }
  };

  return (
    <>
      <div className="w-[100%] min-h-screen bg-slate-500">
        <div className="max-w-[1200px] h-[100vh] mx-auto flex flex-col justify-center items-center gap-1">
          <h1 className="text-3xl  text-slate-900 font-bold">Join Chat</h1>
          <input type="text" onChange={(e) => setUserName(e.target.value)} className="border-2 border-slate-400 rounded-[10px] pl-1" placeholder="Your Name..." />
          <input type="text" onChange={(e) => setRoom(e.target.value)} className="border-2 border-slate-400 rounded-[10px] pl-1" placeholder="ID Room" />
          <button onClick={joinRoom} className="border-2 border-slate-400 rounded-[10px] px-2 bg-blue-950 text-white w-20">
            Join
          </button>
          <ChatRoom socket={socket} username={username} room={room} />
        </div>
      </div>
    </>
  );
}

export default App;
