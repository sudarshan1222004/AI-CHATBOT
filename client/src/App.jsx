import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "You", text: input }];
    setMessages(newMessages);
    setInput("");

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    setMessages([...newMessages, { sender: "AI", text: data.reply }]);
  };

  return (
    <div style={{ width: "500px", margin: "50px auto", fontFamily: "Arial" }}>
      <h1>🤖 Chatbot</h1>
      <div
        style={{
          border: "1px solid gray",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, i) => (
          <p key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={handleSend} style={{ width: "18%", padding: "10px" }}>
        Send
      </button>
    </div>
  );
}

export default App;
