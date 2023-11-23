import React, { useEffect } from "react";

function ChatRoom({ socket, username, room }: any) {
  const [message, setMessage] = React.useState("");
  const [messageList, SetMessageList] = React.useState<any>([]);

  const sendMessage = async () => {
    if (message !== "") {
      const dataMessage = {
        message,
        username,
        room,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", dataMessage);
      SetMessageList((list: any) => [...list, dataMessage]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      SetMessageList((list: any) => [...list, data]);
    });
  }, [socket, messageList]);
  return (
    <div className="flex flex-col   border-2 rounded-[10px] box-border flex-wrap ">
      <div className="chatHeader bg-slate-900 rounded-t-[10px]">
        <h1 className="text-xl text-center font-bold text-white ">Live Chat</h1>
      </div>
      <div className="chatbody h-80 bg-slate-200 overflow-auto">
        {messageList.map((data: any, key: number) => (
          <div key={key} className={`flex p-1 ${username === data.username ? "justify-end" : ""}`}>
            <div>
              {username !== data.username && <p className="text-sm text-gray-600">@{data.username}</p>}
              <p className={`w-[max-content] px-2 rounded-md  text-white  ${username === data.username ? " bg-blue-950" : "bg-green-950"}`}>{data.message}</p>
              <p className="text-xs ">{data.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="chatFooter flex flex-col ">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
        <button onClick={sendMessage} className="bg-blue-950  rounded-b-[10px]  text-white">
          send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
