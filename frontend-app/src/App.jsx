import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/styles.css';

const Header = () => (
  <header className="header">
    {/* Header content can go here, like user profile, notifications, etc. */}
  </header>
);

const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-header">Notivize</div>
    <nav>
      <ul className="sidebar-nav">
        <li><NavLink to="/inbox">Inbox</NavLink></li>
        <li><NavLink to="/calendar">Calendar</NavLink></li>
        <li><NavLink to="/summary">Summary</NavLink></li>
        <li><NavLink to="/urgency">Urgency</NavLink></li>
        <li><NavLink to="/chat">Chat</NavLink></li>
      </ul>
    </nav>
  </aside>
);


function App() {
  return (
    <div className="app-container">
      <Header />
      <Sidebar />
      <main className="main-content">
        <Outlet /> {/* Child routes will render here */}
      </main>
    </div>
  );
}

export default App;