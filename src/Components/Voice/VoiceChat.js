import React, { useState, useEffect, useCallback } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faRecordVinyl,
  faCircleStop,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../Styles/VoiceChat.css";

const VoiceChatModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { resetTranscript, listening } = useSpeechRecognition(); // Хук для распознавания речи
  const [mediaRecorder, setMediaRecorder] = useState(null); // Состояние для хранения MediaRecorder
  const accessToken = localStorage.getItem("accessToken");
  const [socket, setSocket] = useState(null);
	const WS_URL = process.env.REACT_APP_WS_URL;

	const connectWebSocket = useCallback(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(socket);
  }, [WS_URL]);

  const speakText = useCallback((text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechText);
  }, []);



  // Функция для отправки сообщений на сервер
  const sendToServer = useCallback(
    async (messageToSend) => {
      try {
        const audioUrl = process.env.REACT_APP_API_VOICE_URL;
        const textData = { message: messageToSend };
        const textResponse = await fetch(audioUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(textData),
        });
        if (!textResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await textResponse.json();
        resetTranscript();
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: responseData.command, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [accessToken, resetTranscript]
  );

  // Функция для отправки сообщения
  const sendMessage = useCallback(
    (messageToSend) => {
      if (messageToSend.trim() !== "") {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: messageToSend,
            sender: "user",
          },
        ]);
        setUserInput("");
        sendToServer(messageToSend);
        speakText(messageToSend);
      } else {
        document.getElementById("userInput").style.borderColor = "red";
      }
    },
    [sendToServer, speakText]
  );

  // Функция для открытия/закрытия модального окна
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (showModal) {
      connectWebSocket();
    } else if (socket) {
      socket.close();
    }
  }, [showModal, connectWebSocket, socket]);

  // Функция для отправки аудиозаписи на сервер
  const sendAudioToServer = useCallback(
    async (blob) => {
      try {
        console.log("Sending audio to server...");
        const audioUrl = process.env.REACT_APP_API_VOICE_URL;

        const audioFormData = new FormData();
        audioFormData.append("file", blob, "audio.webm");

        const audioResponse = await fetch(audioUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Access-Control-Request-Method": "GET",
            Origin: "http://example.com/",
          },
          mode: "cors",
          method: "POST",
          body: audioFormData,
        });

        // Проверяем статус ответа на запрос
        if (!audioResponse.ok) {
          throw new Error("Network response was not ok");
        }

        console.log("Audio sent successfully!");

        // Возвращаем данные ответа
        return await audioResponse.json();
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    [accessToken]
  );

  // Функция для начала ввода голоса
  const startVoiceInput = async () => {
    try {
      if (!listening) {
        // Прослушивание речи с помощью SpeechRecognition
        await SpeechRecognition.startListening();

        // Проверка поддержи распознавания речи в браузере и доступно ли устройство
        if (
          SpeechRecognition.browserSupportsSpeechRecognition() &&
          navigator.mediaDevices
        ) {
          // Получаем поток аудиоданных от пользователя
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          if (stream) {
            // Создаем экземпляр MediaRecorder для записи аудио
            const mediaRecorder = new MediaRecorder(stream, {
              mimeType: "audio/webm",
            });
            const chunks = [];
            // Обработка для события ondataavailable, который срабатывает при получении куска данных
            mediaRecorder.ondataavailable = (e) => {
              console.log("Received data chunk:", e.data);
              chunks.push(e.data);
            };
            // Обработка для события onstop, который срабатывает при остановке записи
            mediaRecorder.onstop = async () => {
              try {
                // Создаем Блоб из записанных данных
                const blob = new Blob(chunks, { type: "audio/webm" });
                // Отправляем аудиофайл на сервер и получаем ответ
                const responseData = await sendAudioToServer(blob);
                if (responseData) {
                  // Если получен ответ, добавляем его в состояние сообщений с указанием отправителя пользователь
                  setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: responseData.command, sender: "user" },
                  ]);
                }
              } catch (error) {
                console.error("Error creating Blob:", error);
              }
            };
            // Начинаем запись аудио
            setMediaRecorder(mediaRecorder);
            mediaRecorder.start();
          } else {
            console.error("MediaStream is not available.");
          }
        } else {
          console.error("Browser or Speech Recognition not supported.");
        }
      } else {
        // Останавливаем прослушивание, если уже идет
        SpeechRecognition.stopListening();
        // Останавливаем запись аудио, если она идет
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      }
    } catch (error) {
      console.error("Error starting voice input:", error);
    }
  };

  // Обработчик изменения ввода пользователя
  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  // Обработчик нажатия клавиши Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage(userInput.trim());
      setUserInput("");
    }
  };

  return (
    <div
      className="voice-chat-modal-container"
      aria-label="Контейнер модального окна голосового чата"
    >
      <button
        className="open"
        onClick={toggleModal}
        aria-label="Кнопка открыть чат"
      >
        <FontAwesomeIcon
          icon={faCommentDots}
          style={{ color: "#000000" }}
        />
      </button>
      {showModal && (
        <dialog
          className="modal"
          aria-labelledby="Модальное окно голосового чата"
          open
        >
          <div className="modal-content">
            <button
              className="close"
              onClick={toggleModal}
              aria-label="Кнопка закрыть чат"
            >
              <FontAwesomeIcon
                icon={faXmark}
                style={{ color: "#000000" }}
              />
            </button>
            <h2 id="chat-heading" className="chat-header">
              Vesel
            </h2>
            <div
              className="user-bot-message-container"
              role="log"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-widget ${
                    message.sender === "user"
                      ? "user-message-widget"
                      : "bot-message-widget"
                  }`}
                >
                  <p className="message-text">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                id="userInput"
                type="text"
                placeholder="Введите сообщение"
                value={userInput}
                onInput={handleUserInput}
                onKeyPress={handleKeyPress}
                aria-label="Введите сообщение"
              />
              <button
                className="voice"
                onClick={startVoiceInput}
                aria-label="Начать распознавание речи"
              >
                <FontAwesomeIcon
                  icon={listening ? faCircleStop : faRecordVinyl}
                  style={{ color: "#000000" }}
                  className="voice-icon"
                />
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default VoiceChatModal;
