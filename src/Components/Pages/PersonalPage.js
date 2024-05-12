import React from 'react';
import Header from '../Header';
import VoiceChatModal from '../Voice/VoiceChat';
import UserProfile from '../MainContent';


function Personal() {
  return (
    <div className="Home" aria-label="Шапка сайта, у нас есть голосовой ассистент, находится в нижней правой части экрана">
			<Header />
			<UserProfile />
      <VoiceChatModal />
    </div>
  );
}

export default Personal;
