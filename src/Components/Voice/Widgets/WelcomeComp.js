import React from "react";

const WelcomeComponent = ({ handleAction }) => {
  // Функция обработки нажатия на кнопку
  const handleButtonClick = (action) => {
    // Передаем выбранное действие обработчику
    handleAction(action);
  };

  return (
    <div>
      {/* Приветственное сообщение */}
      <p>Здравствуйте, чем могу помочь?</p>
      
      {/* Кнопки для выбора действий */}
      <button onClick={() => handleButtonClick("Узнать баланс")}>
        Узнать баланс
      </button>
      <button onClick={() => handleButtonClick("Совершить перевод")}>
        Совершить перевод
      </button>
      <button onClick={() => handleButtonClick("Оплатить")}>Оплатить</button>
    </div>
  );
};

export default WelcomeComponent;
