import { useState } from "react";
import ChatMessage from "./ChatMessage";
const ChatUi = () => {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([
    {
      user: "gpt",
      message: "how can i help you ?",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChatLog([...chatlog, { user: "me", mesasge: `${input}` }]);
    setInput("");

    const fastApi = `${import.meta.env.VITE_FASTAPI_URL}/generate`;
    const response = await fetch(fastApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mesasge: chatlog.map((message) => message.message).join(""),
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="flex max-w-full ml-0 mr-0 pl-0 pr-0 text-white text-center bg-color-dark-grey h-screen">
      <aside className="sidemenu bg-color-greyblack">
        <div className=" p-4 border rounded-md hover:bg-opacity-50 transition duration-300 ease-in-out hover:bg-white border-white text-left ">
          <span className="pl-2 pr-2 ">&#43;</span>
          New Chat
        </div>
      </aside>
      <section className="flex-1 relative">
        <div className="chat-log p-4 h-screen text-left">
          {chatlog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}

          <div className="chat-message-ai p-4">
            <div className="flex ml-10">
              <div className="chat-avatar bg-white rounded-full w-10 h-10"></div>
              <div className="message p-3 ml-5 mt-1"></div>
            </div>
          </div>
        </div>
        <div className="p-3 absolute top-auto bottom-0 left-0 right-0">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-slate-800 border-none border w-90 border-transparent rounded-lg outline-none p-3 text-color-white text-lg"
              value={input}
              id=""
              rows="1"
              onChange={handleChange}
              placeholder="Type your message here..."
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default ChatUi;