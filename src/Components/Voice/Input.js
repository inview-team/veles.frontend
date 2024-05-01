import React from "react"; 

const InputComponent = ({ userInput, handleUserInput, sendMessage }) => {
  return (
    <div className="input-container"> {/* Контейнер для ввода сообщения */}
      <input
        id="userInput" // Уникальный идентификатор для элемента ввода
        type="text" // Тип поля ввода текста
        placeholder="Введите сообщение"
        value={userInput} // Значение поля, связ с состоянием
        onChange={handleUserInput} // Обработчик изменения текста в инпуте
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default InputComponent; 
