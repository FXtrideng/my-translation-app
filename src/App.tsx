import React, { useState } from "react";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("fr");

  // Function to handle translation
  const handleTranslation = async () => {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText
      )}&langpair=${sourceLang}|${targetLang}`
    );
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };

  // Function for starting voice recognition
  const startListening = () => {
    const recognition =
      new window.SpeechRecognition() || new window.webkitSpeechRecognition();
    recognition.lang = sourceLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleTranslation();
    };

    recognition.start();
  };

  return (
    <div>
      <h1>Translation App</h1>

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type text"
      />

      <button onClick={handleTranslation}>Translate</button>
      <button onClick={startListening}>Start Speaking</button>

      <div>
        <h2>Translated Text</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default App;
