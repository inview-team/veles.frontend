import React from "react"; 
import '../Styles/VoiceChat.css';

const InputComponent = ({ userInput, handleUserInput, sendMessage }) => {
  // обрабатываем нажатие enter
  const handleKeyPress = (event) => {
    // Проверка нажатия enter 
    if (event.key === 'Enter') {
      sendMessage(); // вызов функции отправки сообщений
    }
  };

  return (
    <>
      <input
        id="userInput"
        type="text"
        placeholder="Введите сообщение"
        value={userInput}
        onChange={handleUserInput}
        onKeyPress={handleKeyPress} // обработчик кнопки enter
      />
    </>
  );
};

export default InputComponent;

