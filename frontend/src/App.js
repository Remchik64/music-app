import React, { useState, useEffect } from 'react';
import './App.css';

// Компонент навигации
const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><a href="#" className="nav-link active">Студия</a></li>
        <li><a href="#" className="nav-link">Библиотека</a></li>
        <li><a href="#" className="nav-link">Настройки</a></li>
      </ul>
    </nav>
  );
};

// Компонент чата с ИИ
const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Чем я могу помочь с вашей музыкой сегодня?', sender: 'ai' }
  ]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI Ассистент</h2>
      </div>
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Напишите сообщение..." />
        <button className="send-button">Отправить</button>
      </div>
    </div>
  );
};

// Компонент музыкальной студии
const MusicStudio = () => {
  return (
    <div className="studio-container">
      <div className="studio-header">
        <h2>Музыкальная Студия</h2>
      </div>
      <div className="tracks-container">
        <div className="track">
          <div className="track-controls">
            <span className="track-name">Мелодия</span>
            <button className="track-button">M</button>
            <button className="track-button">S</button>
          </div>
          <div className="track-content"></div>
        </div>
        <div className="track">
          <div className="track-controls">
            <span className="track-name">Ритм</span>
            <button className="track-button">M</button>
            <button className="track-button">S</button>
          </div>
          <div className="track-content"></div>
        </div>
      </div>
    </div>
  );
};

// Компонент транспортной панели
const TransportControls = () => {
  return (
    <div className="transport-controls">
      <button className="transport-button"><i className="icon-record"></i></button>
      <button className="transport-button"><i className="icon-play"></i></button>
      <button className="transport-button"><i className="icon-stop"></i></button>
      <button className="transport-button"><i className="icon-loop"></i></button>
      <div className="transport-time">00:00:00</div>
    </div>
  );
};

// Компонент переключателя темы
const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    // Сохраняем выбор пользователя в localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // При первой загрузке проверяем сохраненную тему
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  return (
    <button 
      className="theme-toggle-button" 
      onClick={toggleTheme}
      title={isDarkTheme ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
    >
      {isDarkTheme ? '☀️' : '🌙'}
    </button>
  );
};

// Главный компонент приложения
function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <h1>Music<span>AI</span></h1>
        </div>
        <Navigation />
        <div className="user-profile">
          <ThemeToggle />
          <button className="profile-button">Профиль</button>
        </div>
      </header>
      
      <div className="main-content">
        <aside className={`chat-sidebar ${isSidebarVisible ? '' : 'sidebar-hidden'}`}>
          <AIChat />
        </aside>
        <div className="sidebar-toggle-button" onClick={toggleSidebar}>
          {isSidebarVisible ? '<' : '>'}
        </div>
        <main className="studio-main">
          <MusicStudio />
        </main>
      </div>
      
      <footer className="app-footer">
        <TransportControls />
      </footer>
    </div>
  );
}

export default App;
