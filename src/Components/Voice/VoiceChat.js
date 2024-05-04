import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"; // Библиотека распознавания речи
import ModalComponent from "./Modal"; // Компонент модального окна
import ChatComponent from "./Chat"; // Компонент чата
import InputComponent from "./Input"; // Компонент ввода текста
import VoiceInputComponent from "./VoiceInput"; // Компонент голосового ввода
import MessageWidgetComponent from "./MessageWidget"; // Компонент виджета сообщения
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Иконка
import { faCommentDots } from "@fortawesome/free-solid-svg-icons"; // Иконка
import '../Styles/VoiceChat.css'; // 
import { sendToServer } from "../api/api"; // Функция, для отправки на сервер

const VoiceChatModal = () => {
  // Хуки состояния компонента
  const [showModal, setShowModal] = useState(false); // Состояние для отображения/скрытия модального окна
  const [userInput, setUserInput] = useState(""); // Состояние для введенного текста пользователем
  const [botResponse, setBotResponse] = useState(""); // Состояние для ответа бота
  const [messages, setMessages] = useState([]); // Состояние для хранения сообщений чата
  const { transcript, resetTranscript, listening, finalTranscript } = useSpeechRecognition();

  // Эффект для отправки сообщений на сервер при завершении распознавания речи
  useEffect(() => {
    if (!listening && finalTranscript !== "") {
      sendMessage(finalTranscript);
    }
  }, [finalTranscript, listening]);

  // Переключение модального окна
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Функция для обновления состояния пользовательского ввода
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Функция для отправки сообщения на сервер
  const sendMessage = (messageToSend) => {
    if (messageToSend.trim() !== "") {
      setMessages([...messages, { text: messageToSend, sender: "user" }]);
      setUserInput("");
      sendToServer(messageToSend, setMessages, resetTranscript, finalTranscript, setBotResponse);
    } else {
      document.getElementById("userInput").style.borderColor = "red";
    }
  };

  // Начало/остановка записи речи
  const startVoiceInput = () => {
    if (!listening) {
      SpeechRecognition.startListening();
    } else {
      SpeechRecognition.stopListening();
      if (finalTranscript !== "") {
        sendMessage(finalTranscript);
      }
    }
  };
	
  return (
    <div className="voice-chat-modal-container">
      <button className="open" onClick={toggleModal}>
        <FontAwesomeIcon icon={faCommentDots} style={{ color: "#000000", fontSize: "3em" }} />
      </button>
      {showModal && (
        <ModalComponent onClose={toggleModal}>
          <h2 className="chat-header">Vesel</h2>
          <ChatComponent messages={messages} />
          <div className="input-container">
            <InputComponent
              userInput={userInput}
              handleUserInput={handleUserInput}
              sendMessage={() => sendMessage(userInput)}
            />
            <VoiceInputComponent
              listening={listening}
              startVoiceInput={startVoiceInput}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default VoiceChatModal;
