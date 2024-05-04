import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import '../Styles/VoiceChat.css';

const VoiceInputComponent = ({ listening, startVoiceInput, stopVoiceInput }) => {
  return (
    <button className="voice" onClick={listening ? stopVoiceInput : startVoiceInput}>
      {listening ? (
        <FontAwesomeIcon icon={faCircleStop} style={{ color: "#000000", fontSize: "2em" }} className="voice-icon" />
      ) : (
        <FontAwesomeIcon icon={faRecordVinyl} style={{ color: "#000000", fontSize: "2em" }} className="voice-icon" />
      )}
    </button>
  );
};

export default VoiceInputComponent;
