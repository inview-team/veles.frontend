import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Personal from './Components/Pages/PersonalPage';
import LoginForm from "./Components/Pages/LoginPage";
import Signup from "./Components/Pages/SignPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

	const BANK_API = process.env.REACT_APP_BANK_API;

	const fetchUserData = async (accessToken) => {
		try {
			const response = await fetch(BANK_API + '/api/v1/me', {
				headers: {
					'Authorization': `Bearer ${accessToken}`
				}
			});
			
			if (!response.ok) {
				throw new Error('Ошибка при получении данных пользователя');
			}
			
			const userData = await response.json();
			return userData;
		} catch (error) {
			throw new Error(error.message);
		}
	};

  // Проверка наличия токена доступа при загрузке приложения
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken);
  }, []);

	const refreshAccessToken = async () => {
    try {
      const response = await fetch(BANK_API + '/api/v1/refresh', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          refresh: "value"
        })
      });
      if (!response.ok) {
        throw new Error("Ошибка при обновлении токена доступа");
      }
      const { accessToken } = await response.json();
      localStorage.setItem("accessToken", accessToken);
      return accessToken;
    } catch (error) {
      console.error("Ошибка при обновлении токена доступа:", error);
      throw error;
    }
  };
	

  // Функция для выхода из учетной записи
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // Функция для входа пользователя после успешной регистрации
const handleRegister = async (accessToken, refreshToken) => {
  setIsAuthenticated(true);
  localStorage.setItem("accessToken", accessToken);
  try {
    const userData = await fetchUserData(accessToken);
    console.log("Данные пользователя:", userData);
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    console.warn("Попытаемся обновить токен доступа...");
    try {
      const newAccessToken = await refreshAccessToken(refreshToken);
      const userData = await fetchUserData(newAccessToken);
      console.log("Данные пользователя (после обновления токена):", userData);
    } catch (error) {
      console.error("Ошибка при обновлении токена доступа:", error);
    }
  }
};


  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Signup onRegister={handleRegister} />} />
          <Route path="/login" element={<LoginForm onLogin={() => setIsAuthenticated(true)} />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Personal onLogout={logout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
/*
return (
<div className="app">
<Router>
	<Routes>
		<Route path="/" element={<Signup />} />
		<Route path="/login" element={<LoginForm />} />
		<Route path="/dashboard" element={<Personal />} />
	</Routes>
</Router>
</div>
);
}
export default App;*/
