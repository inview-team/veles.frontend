import React, { useState, useEffect } from 'react';
import './Styles/Header.css';
import logo from './img/logo.png';


const Header = ({ onLogout }) => {
  return (
    <header className="header" aria-label="Шапка сайта">
      <div className="logo">
        <img src={logo} alt="Логотип МТС, у нас появился голосовой ассистент" />
      </div>
      <nav className="menu" aria-label="Главное меню">
        <ul>
          <li><a href="/dashboard" aria-label="Главная">Главная</a></li>
          <li><a href="/dashboard" aria-label="Переводы и платежи">Переводы и платежи</a></li>
          <li><a href="/dashboard" aria-label="Личный кабинет">Личный кабинет</a></li>
        </ul>
      </nav>
      <div className="user-info" aria-label="Пользовательская информация и кнопка выйти">
        <button className ='logout' aria-label="Кнопка выйти" onClick={onLogout}>Выйти</button>
      </div>
    </header>
  );
};

export default Header;
