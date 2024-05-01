import React from "react";

const VoiceInputComponent = ({ listening, startVoiceInput }) => {
  return (
    <button onClick={startVoiceInput}>
      {listening ? "Остановить запись" : "Начать запись"}
    </button>
  );
};

export default VoiceInputComponent;