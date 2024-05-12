import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "../Styles/SignPage.css";

const Signup = ({ onRegister }) => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [error, setError] = useState(null);

  const authUrl = process.env.REACT_APP_API_AUTH_URL;

  const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(authUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					first_name,
					last_name,
          email,
        	phone_number,
          password,
					password2,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				const { accessToken, refreshToken } = data;
				onRegister(accessToken, refreshToken);
				localStorage.setItem("accessToken", accessToken);
				document.cookie = `refreshToken=${refreshToken}; path=/;`;
				console.log("Регистрация успешна:", data);
				setRegistrationSuccess(true);
			} else {
				console.error("Ошибка при регистрации:", data.error);
				setError(data.error);
			}
		} catch (error) {
			console.error("Ошибка при запросе:", error);
			setError("Произошла ошибка при запросе. Пожалуйста, попробуйте еще раз.");
		}
	};
	
	if (registrationSuccess) {
		console.log("Перенаправление на страницу /dashboard...");
		return <Navigate to="/dashboard" />;
	}
	
  return (
    <div className="signup-form">
      <h2>Регистрация</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input
          type="text"
          placeholder="Имя"
          value={first_name}
          onChange={(e) => setFirst_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          value={last_name}
          onChange={(e) => setLast_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="Номер телефона"
          value={phone_number}
          onChange={(e) => setPhone_number(e.target.value)}
        />
        <input
          type="text"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
				<input
          type="password"
          placeholder="Введите пароль еще раз"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default Signup;
