// App: shell layout (header + sidebar + routed main content)
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/styles.css';

import { mockEmails } from './data/mockData';

// Header: shows date and total email count
const Header = () => {
  const today = new Date().toLocaleDateString();
  return (
    <header className="header">
      <div className="header-info-glass">
        <span>{today}</span>
        <span>{mockEmails.length} Emails</span>
      </div>
    </header>
  );
};

// Sidebar: navigation to main sections
const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-header">Notivize</div>
    <nav>
      <ul className="sidebar-nav">
  <li><NavLink to="/emails">Emails</NavLink></li>
        <li><NavLink to="/calendar">Calendar</NavLink></li>
        <li><NavLink to="/summary">Summary</NavLink></li>
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