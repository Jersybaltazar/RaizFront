import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaFacebookMessenger } from "react-icons/fa";

// import axios from "axios";

const sendMessageToServer = async (message: string) => {
  try {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Server response not OK");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

const ChatBox = () => {
  const [isActive, setIsActive] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { content: string; isUser: boolean }[]
  >([]);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when chat history changes
    scrollToBottom();
  }, [chatHistory]);

  const toggleChatbox = () => {
    setIsActive(!isActive);
    console.log("Chat activo:", isActive);
  };

  const handleSendMessage = async () => {
    if (!messageInputRef.current) return;

    const message = messageInputRef.current.value.trim();
    if (!message) return;

    try {
      const serverResponse = await sendMessageToServer(message);
      updateChatHistory(message, serverResponse);

      messageInputRef.current.value = ""; // Clear input after sending
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle errors appropriately in the UI (e.g., display error message)
    }
  };

  const updateChatHistory = (message: string, serverResponse: string) => {
    setChatHistory((prevState) => [
      ...prevState,
      { content: message, isUser: true },
      { content: serverResponse, isUser: false },
    ]);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer = messagesEndRef.current.parentElement;
      const footerElement =
        messagesContainer?.querySelector(".chatbox__footer");
      if (messagesContainer && footerElement) {
        const footerHeight = footerElement.clientHeight || 0;
        const newScrollTop =
          messagesContainer.scrollHeight -
          messagesContainer.clientHeight -
          footerHeight;
        messagesContainer.scrollTo({ top: newScrollTop, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="chatbox">
      <style jsx>{`
        /* Estilos CSS para el Chatbox */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: "Nunito", sans-serif;
          font-weight: 400;
          /* font-size: 100%; */
          background: #ff0000;
        }

        *,
        html {
          --primaryGradient: linear-gradient(
            93.12deg,
            #00123d 0.52%,
            #00123d 100%
          );
          --secondaryGradient: linear-gradient(
            268.91deg,
            #00123d -2.14%,
            #00123d 99.69%
          );
          --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
          --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
          --primary: #00123d;
        }

        .chatbox {
          bottom: 30px;
          right: -50px;
        }

        .chatbox__support {
          display: flex;
          flex-direction: column;
          background: #eee;
          width: 300px;
          height: 350px;
          margin: 80px;
          z-index: -123456;
          opacity: 0;
          transition: all 0.5s ease-in-out;
        }

        .chatbox--active {
          transform: translateY(-40px);
          z-index: 123456;
          opacity: 1;
          border-radius: 30px;
        }

        .chatbox__button {
          margin-left: 80px;
          
          text-align: right;
          z-index: 9999;
        }
        .chatbox--active .chatbox__button {
          right: 330px; /* Ajusta la posición para que el botón esté al lado del chat */
        }

        .send__button {
          padding: 6px;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
        }

        .chatbox__header {
          position: sticky;
          top: 0;
          background: orange;
        }

        .chatbox__messages {
          margin-top: auto;
          display: flex;
          overflow-y: auto;
          flex-direction: column;
          flex: 1;
        }
        /* 
        .messages__item {
          background: orange;
          max-width: 60.6%;
          width: fit-content;
          font-size: 14px;
        } */

        .messages__item--operator {
          margin-right: auto;
        }

        .messages__item--visitor {
          margin-left: auto;
        }

        .chatbox__footer {
          position: sticky;
          bottom: 0;
        }

        .chatbox__support {
          background: #f9f9f9;
          height: 380px;
          width: 280px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }

        .chatbox__header {
          background: var(--primaryGradient);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 15px 20px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: var(--primaryBoxShadow);
        }

        .chatbox__image--header {
          margin-right: 10px;
        }

        .chatbox__image--header img {
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: block;
          object-fit: cover;
        }

        .chatbox__heading--header {
          font-size: 1rem;
          color: white;
        }

        .chatbox__description--header {
          font-size: 0.9rem;
          color: white;
        }

        .chatbox__messages {
          padding: 0 20px;
        }

        .messages__item {
          margin-top: 10px;
          background: #e0e0e0;
          padding: 8px 12px;
          max-width: 70%;
          font-size: 14px;
        }

        .messages__item--visitor,
        .messages__item--typing {
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }

        .messages__item--operator {
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          border-bottom-left-radius: 20px;
          background: var(--primary);
          color: white;
        }

        .chatbox__footer {
          position: fixed;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          padding: 20px 20px;
          background: var(--secondaryGradient);
          box-shadow: var(--secondaryBoxShadow);
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          margin-top: 20px;
        }

        .chatbox__footer input {
          width: 80%;
          border: none;
          padding: 10px 10px;
          border-radius: 30px;
          text-align: left;
        }

        .chatbox__send--footer {
          color: white;
        }

        .chatbox__button button,
        .chatbox__button button:focus,
        .chatbox__button button:visited {
          padding: 10px;
          background: #120d7b;
          border: none;
          outline: none;
          border-top-left-radius: 50px;
          border-top-right-radius: 50px;
          border-bottom-left-radius: 50px;
          box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        .input-text-white {
          color: white;
        }
      `}</style>

      <div className={`chatbox__support ${isActive ? "chatbox--active" : ""}`}>
        <div className="chatbox__header">
          <div className="chatbox__image--header">
          <Image alt="" src="/client/public/assets/bot.gif" width={23} height={50}/>
          </div>
          <div className="chatbox__content--header">
            <h4 className="chatbox__heading--header">ChatAssistent</h4>
            <p className="chatbox__description--header">
              Hola! soy bot de grupo raiz :)
            </p>
          </div>
        </div>
        <div className="chatbox__messages">
          {/* Aquí puedes mostrar mensajes de bienvenida o cualquier otro mensaje predeterminado */}
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`messages__item ${
                message.isUser
                  ? "messages__item--visitor"
                  : "messages__item--operator"
              }`}
              style={{
                alignSelf: message.isUser ? "flex-end" : "flex-start",
                textAlign: message.isUser ? "right" : "left",
              }}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="chatbox__footer">
          <input
            ref={messageInputRef}
            type="text"
            placeholder="Escribe un mensaje..."
            className="input-text-white"
          />
          <button
            className="chatbox__send--footer send__button"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

      <div className="chatbox__button" style={{ marginLeft: "219px" , position: "fixed", marginTop:"-55px"}}>
      <button 
          className="chatbox__send--footer send__button"
          onClick={toggleChatbox}
          style={{ display: "flex", alignItems: "center" }}
        >
          <FaFacebookMessenger
            className="messenger-icon"
            style={{ marginRight: "5px" }}
          />{" "}
          Chatea aquí!
        
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
