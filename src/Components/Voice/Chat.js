import React from "react"; // 
import MessageWidgetComponent from "./MessageWidget"; // Импорт компонента для отображения сообщений чата
import './VoiceChat.css';


const ChatComponent = ({ messages }) => {
  return (
    <div className="user-bot-message-container"> {/* Контейнер для сообщений чата */}
      <div className="header-container"> {/* Контейнер для заголовка чата */}
        Veles 
        {/* Отображение каждого сообщения из массива messages */}
        {messages.map((message, index) => (
          // Компонент MessageWidgetComponent для отображения каждого сообщения
          <MessageWidgetComponent key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default ChatComponent; // Экспорт компонента ChatComponent

