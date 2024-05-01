import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ModalComponent from "./Modal";
import ChatComponent from "./Chat";
import InputComponent from "./Input";
import VoiceInputComponent from "./VoiceInput";
import MessageWidgetComponent from "./MessageWidget";
import "./VoiceChat.css";

const VoiceChatModal = () => {
	// Хуки компонентов/состояния
  const [showModal, setShowModal] = useState(false); // Модальное окно
  const [userInput, setUserInput] = useState(""); // Хранение введенного текста (пользователь)
  const [botResponse, setBotResponse] = useState(""); // Хранение введенного текста (бот)
  const [messages, setMessages] = useState([]);
  const { transcript, resetTranscript, listening, finalTranscript } = useSpeechRecognition();
  
	//Распознавание речи завершено, получен текст, отправляем в чат
  useEffect(() => {
    if (!listening && finalTranscript !== "") {
      sendMessage(finalTranscript);
    }
  }, [finalTranscript, listening]);
  
	//Открытие/закрытие модального окна
  const toggleModal = () => {
    setShowModal(!showModal);
  };

	// Обновление состояния юсеринпута при вводе текста пользователем
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = (messageToSend) => {
		// проверяем, не пустое ли сообщение
    if (messageToSend.trim() !== "") {
			// добавляем сообщение пользователя в массив сообщений
      setMessages([...messages, { text: messageToSend, sender: "user" }]);
			// очищаем поле ввода
      setUserInput("");
			// отправляем сообщение на сервис для обработки ботом
      sendToServer(messageToSend);
    } else {
      document.getElementById("userInput").style.borderColor = "red";
    }
  };

	//Данные на сервер
  const sendToServer = (messageToSend) => {
    fetch("/api/bot", {
      method: "POST",
      body: JSON.stringify({ message: messageToSend }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
				// Сбрасываем состояние распознанной речи
        resetTranscript();
				// Устанавливаем ответ бота в состояние
        setBotResponse(data.response);
				// Добавляем ответ бота в массив сообщений
        setMessages([...messages, { text: data.response, sender: "bot" }]);
				const message = new SpeechSynthesisUtterance(data.response);
      window.speechSynthesis.speak(message);
      })
      .catch((error) => console.error("Error:", error));
  };

	// Начало и остановка записи голоса
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
      <button onClick={toggleModal}>Открыть голосовой чат</button>
      {showModal && (
        <ModalComponent onClose={toggleModal}>
          <ChatComponent messages={messages} />
          <InputComponent
            userInput={userInput}
            handleUserInput={handleUserInput}
            sendMessage={() => sendMessage(userInput)}
          />
          <VoiceInputComponent listening={listening} startVoiceInput={startVoiceInput} />
        </ModalComponent>
      )}
    </div>
  );
};

export default VoiceChatModal;