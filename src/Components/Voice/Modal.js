import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../Styles/VoiceChat.css';

const ModalComponent = ({ children, onClose }) => {
  return (
    // Модальное окно
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} style={{ color: "#000000", fontSize: "2em" }} />
        </button>
        {/* Отображение дочерних компонентов, переданных в этот компонент */}
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
