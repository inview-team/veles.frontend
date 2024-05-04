import React from 'react';
import './Styles/Header.css'; // Подключаем файл стилей для Header
import logo from './img/logo.png'; // Импортируем изображение логотипа

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Логотип МТС" aria-label="Логотип МТС" role="img" /> {/* Добавляем атрибуты aria-label и role */}
      </div>
      <nav className="menu" aria-label="Главное меню">
        <ul>
          <li><a href="#" aria-label="Главная">Главная</a></li>
          <li><a href="#" aria-label="Переводы и платежи">Переводы и платежи</a></li>
          <li><a href="#" aria-label="О нас">О нас</a></li>
        </ul>
      </nav>
      <div className="user-info">
        <p>+7 123 456 7890</p>
        <button className="login-button" aria-label="Войти">Войти</button>
      </div>
    </header>
  );
};

export default Header;
