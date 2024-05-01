import React, { useEffect } from "react"; 
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechRecognitionComponent = ({ onSendMessage }) => {
  const { listening, finalTranscript } = useSpeechRecognition(); // Получаем состояние распознавания речи из хука 

  useEffect(() => {
    // Эффект, запускающийся при изменении finalTranscript/listening
    if (!listening && finalTranscript !== "") { // Проверяем завершение распознавания речи и наличия финального текста
      onSendMessage(finalTranscript); // Вызываем функцию для отправки финального текста
      SpeechRecognition.stopListening(); // Остановливаем распознавание речи
    }
  }, [finalTranscript, listening, onSendMessage]); // это зависимости эффекта

  const startVoiceInput = () => { // Запись голоса и запуск распознавания речи
    SpeechRecognition.startListening(); 
  };

  return (
    <div className="speech-recognition-container"> {/* Контейнер для компонента распознавания речи */}
      <button onClick={startVoiceInput}> {/* Кнопка для начала записи голоса */}
        {listening ? "Остановить запись" : "Начать запись"} {/* Меняется текст (потом иконки), в зависимости от состояния */}
      </button>
    </div>
  );
};

export default SpeechRecognitionComponent; 
