import React, { useEffect } from "react";

const ChatbotComponent: React.FC = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString: string) => {
      const style = document.createElement("style");
      style.textContent = styleString;
      document.head.append(style);
    };

    // Define los estilos del iframe
    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
        z-index: 1000;
      }
    `);

    iframe.src = "https://cersi-ia.vercel.app/chatbot";
    iframe.classList.add("chat-frame");
    document.body.appendChild(iframe);

    // Manejo de mensajes
    const handleMessage = (e: MessageEvent) => {
      if (e.origin !== "https://cersi-ia.vercel.app") return;

      try {
        const dimensions = JSON.parse(e.data);
        iframe.width = `${dimensions.width}px`;
        iframe.height = `${dimensions.height}px`;

        // Enviar mensaje al iframe
        iframe.contentWindow?.postMessage(
          "8ca49ed5-1886-4826-8488-5a7182d83432",
          "https://cersi-ia.vercel.app/"
        );
      } catch (error) {
        console.error("Error al procesar el mensaje:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      document.body.removeChild(iframe);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return null; // Este componente no renderiza nada en el DOM directamente
};

export default ChatbotComponent;
