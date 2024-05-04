import React from "react";
import '../Styles/VoiceChat.css';

const MessageWidgetComponent = ({ message }) => {
  return (
    // Блок сообщения с классом message-widget и классом, зависящим от отправителя сообщения
    <div className={`message-widget ${message.sender}-message-widget`}>
      <p className="message-text">{message.text}</p> {/* Отображаем текст */}
    </div>
  );
};

export default MessageWidgetComponent;
