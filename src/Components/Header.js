import React from 'react';
import './Styles/Header.css';
import logo from './img/logo.png';


const Header = ({ onLogout }) => {
  return (
    <header className="header" aria-label="Шапка сайта">
      <div className="logo">
        <img src={logo} alt="Логотип МТС, у нас появился голосовой ассистент" />
      </div>
      <nav className="menu" aria-label="Главное меню ссылки">
        <ul>
          <li><a href="/dashboard" aria-label="Главная ссылка">Главная</a></li>
          <li><a href="/dashboard" aria-label="Переводы и платежи ссылка">Переводы и платежи</a></li>
          <li><a href="/dashboard" aria-label="Личный кабинет ссылка">Личный кабинет</a></li>
        </ul>
      </nav>
      <div className="user-info">
        <button className ='logout' aria-label="Выйти кнопка" onClick={onLogout}>Выйти</button>
      </div>
    </header>
  );
};

export default Header;
