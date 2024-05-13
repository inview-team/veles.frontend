import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faWallet } from "@fortawesome/free-solid-svg-icons";
import "./Styles/MainContent.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

	const BANK_API = process.env.REACT_APP_BANK_API + "/api/v1/me";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(BANK_API, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Ошибка при получении данных пользователя");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
      }
    };
    fetchUserData();
  }, [BANK_API]);

  return (
    <div className="user-profile" aria-label="Личный кабинет">
      <h1>Личный кабинет</h1>
      <div className="user-inform">
        <p>
          <strong>Имя:</strong> {userData && userData.first_name}
        </p>
        <p>
          <strong>Фамилия:</strong> {userData && userData.last_name}
        </p>
      </div>
      <h2>
        Карты
        <FontAwesomeIcon icon={faWallet} style={{ color: "#000000" }} />
      </h2>
      <div className="financial-info">
        <div className="bank-cards" aria-label="Дебетовые карты">
          <h3>
            Дебетовые карты
            <FontAwesomeIcon icon={faChevronDown} style={{ color: "#000000" }} />
          </h3>
					
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
