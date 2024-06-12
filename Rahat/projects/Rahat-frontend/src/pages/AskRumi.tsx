import React, { useState } from "react";
import axios from "axios";

const aiUrl = import.meta.env.VITE_BACKEND_AI_URL;

export const AskRumi = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() !== "") {
      setNewMessage(""); // Clear the query
      const userMessage = { text: newMessage, sender: "user", time: "Just now" };
      setMessages([...messages, userMessage]);
      const aiResponse = await handleAICall(newMessage);
      if (aiResponse) {
        const aiMessage = { text: aiResponse, sender: "receiver", time: "Just now" };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }
    }
  };

  const handleAICall = async (query) => {
    try {
      const response = await axios.post(aiUrl, { question: query });
      console.log(response);
      return response?.data?.data;
    } catch (error) {
      console.error("Error making AI call:", error);
      return "Error fetching response from AI.";
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full min-h-[800px] bg-gray-100 text-gray-800 p-10">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p className="text-lg">Start your conversation and ask Rumi</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex w-full mt-2 space-x-3 max-w-xs ${message.sender === "user" ? "ml-auto justify-end" : ""}`}
                >
                  {message.sender !== "user" && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[url('https://cdn-icons-png.flaticon.com/256/1448/1448779.png')] bg-cover bg-center"></div>
                  )}
                  <div>
                    <div
                      className={`p-3 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-l-lg rounded-br-lg"
                          : "bg-gray-300 rounded-r-lg rounded-bl-lg"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">{message.time}</span>
                  </div>
                  {message.sender === "user" && (
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[url('https://i.pinimg.com/564x/73/93/d0/7393d0446647c58729adb1ec520396a0.jpg')] bg-cover bg-ceter"></div>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="bg-gray-100 gap-3 p-4 flex items-center justify-center">
            <input
              className="flex items-center h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="bg-blue-600 rounded px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleSendMessage}
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
