import React from "react";
import MessageWidgetComponent from "./MessageWidget"; // Компонент для отображения сообщений
import '../Styles/VoiceChat.css';

const ChatComponent = ({ messages }) => {
  return (
    // Контейнер для сообщений пользователя и бота
    <div className="user-bot-message-container">
      {/* Массив сообщений и отображаем каждое сообщение */}
      {messages.map((message, index) => (
        // Контейнер для отдельного сообщения
        <div
          key={index}
          // Присваиваем класс в зависимости от отправителя сообщения
          className={`message-widget ${message.sender === "user" ? "user-message-widget" : "bot-message-widget"}`}
        >
          {/* Компонент для отображения каждого сообщения */}
          <MessageWidgetComponent message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
