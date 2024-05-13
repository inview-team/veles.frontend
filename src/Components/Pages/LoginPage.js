import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import '../Styles/LoginPage.css'

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState(null);

	const BANK_API = process.env.REACT_APP_BANK_API + "/api/v1/login"; 


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(BANK_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
				const { accessToken, refreshToken } = data;
        onLogin(data.accessToken);
        localStorage.setItem("accessToken", accessToken);
				document.cookie = `refreshToken=${refreshToken}; path=/;`;
        console.log("Вход успешен:", data);
        setLoginSuccess(true);
      } else {
        console.error("Ошибка при входе:", data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error("Ошибка при запросе:", error);
      setError("Произошла ошибка при запросе. Пожалуйста, попробуйте еще раз.");
    }
  };

  if (loginSuccess) {
    console.log("Перенаправление на страницу /dashboard...");
    return <Navigate to="/dashboard" />;
  }

  return (
  <div className="login-form" aria-label="Вход форма">
    <h2>Вход</h2>
    <form onSubmit={handleLoginSubmit}>
      <input
        type="text"
        placeholder="Логин"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Логин поле ввода"
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Пароль поле ввода"
      />
      <button type="submit" aria-label="Войти кнопка">Войти</button>
    </form>
    {error && (
      <p className="error" aria-live="assertive">
        {error}
      </p>
    )}
  </div>
);
};

export default LoginForm;
