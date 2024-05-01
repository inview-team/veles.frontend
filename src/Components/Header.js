import React from 'react';
import './Styles/Header.css';
import logo from './img/logo.png'

const Header = () => {
  return (
    <header className='Header' aria-labelledby="header-heading">
      <img
        className='Logo'
        src={logo}
        alt="Логотип МТС Банка"
      />
      <nav className='Nav' aria-label="Навигация">
        <ul>
          <li><a href="javascript:void(0)" aria-label="Ссылка на Главную страницу">Главная</a></li>
          <li><a href="javascript:void(0)" aria-label="Ссылка на страницу Платежи и переводы">Платежи и переводы</a></li>
          <li><a href="javascript:void(0)" aria-label="Ссылка на страницу Настройки">Настройки</a></li>
        </ul>
      </nav>
      <div className="User-info" aria-label="Информация о пользователе">
        <p aria-label="Номер сотового телефона">+7 123 456 7890</p>
        <button className="LogoutButton" aria-label="Кнопка для выхода">Выйти</button>
      </div>
    </header>
  );
};

export default Header;
