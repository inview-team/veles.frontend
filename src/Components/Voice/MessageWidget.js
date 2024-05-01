import React from "react";


const MessageWidgetComponent = ({ message }) => {
  return (
    // Блок сообщения с классом message-widget и классом, зависящим от отправителя сообщения
    <div className={`message-widget ${message.sender}-message-widget`}>
      {message.text} {/* Отображаем текст */}
    </div>
  );
};

export default MessageWidgetComponent; 
