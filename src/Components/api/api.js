// Функция для отправки записанного аудио на один URL API, отправки распознанного текста на другой URL API 
// и получения ответа с третьего URL API
export const sendToServer = async (audioBlob, messageToSend, userId, setMessages, resetTranscript, setBotResponse) => {
  try {
    // URL API для отправки аудиофайла
    const audioUrl = `${userId}`;
    // URL API для отправки распознанного текста и получения ответа
    const textUrl = `${userId}`;

    // Тело запроса для аудиофайла
    const audioFormData = new FormData();
    audioFormData.append('audio', audioBlob);

    // Запрос для отправки аудиофайла
    const audioResponse = await fetch(audioUrl, {
      method: "POST",
      body: audioFormData,
    });

    // Проверка успешности 
    if (!audioResponse.ok) {
      throw new Error("Network response was not ok");
    }

    // Что то нужно?

    // Тело запроса для отправки распознанного текста
    const textFormData = new FormData();
    textFormData.append('message', messageToSend);

    // Запрос к серверу для отправки распознанного текста и получения ответа
    const textResponse = await fetch(textUrl, {
      method: "POST",
      body: textFormData,
    });

    // Проверяем успешность
    if (!textResponse.ok) {
      throw new Error("Network response was not ok");
    }

    // Извлекаем данные из ответа для распознанного текста
    const responseData = await textResponse.json();

    // Сбрасываем состояние распознанной речи
    resetTranscript();

    // Устанавливаем ответ бота в состояние компонента
    setBotResponse(responseData.response);

    // Добавляем ответ бота в массив сообщений
    setMessages(prevMessages => [...prevMessages, { text: responseData.response, sender: "bot" }]);

  } catch (error) {
    console.error("Error:", error);
  }
};
