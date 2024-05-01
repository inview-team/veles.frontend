import React from "react"; 

const ModalComponent = ({ children, onClose }) => {
  return (
    // Модальное окно
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          Закрыть
        </button>
        {/* Отображение дочерних компонентов, переданных в этот компонент */}
        {children}
      </div>
    </div>
  );
};

export default ModalComponent; 
