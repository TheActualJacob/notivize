// App: shell layout (header + sidebar + routed main content)
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/styles.css';

import { mockEmails } from './data/mockData';

// Header: shows date, total email count, and workload indicator
const Header = () => {
  const today = new Date().toLocaleDateString();
  
  // Calculate workload based on urgent emails
  const urgentEmails = mockEmails.filter(email => email.urgency === 'high').length;
  const mediumEmails = mockEmails.filter(email => email.urgency === 'medium').length;
  
  // Determine workload level and styling
  const getWorkloadInfo = () => {
    if (urgentEmails >= 3) {
      return { level: 'Heavy', color: 'heavy', icon: '🔥' };
    } else if (urgentEmails >= 1 || mediumEmails >= 4) {
      return { level: 'Medium', color: 'medium', icon: '⚡' };
    } else {
      return { level: 'Light', color: 'light', icon: '✨' };
    }
  };
  
  const workload = getWorkloadInfo();
  
  return (
    <header className="header">
      <div className="header-info-glass">
        <span className="header-date">{today}</span>
        <span className="header-email-count">{mockEmails.length} Emails</span>
        <div className={`workload-indicator workload-${workload.color}`}>
          <span className="workload-icon">{workload.icon}</span>
          <span className="workload-text">{workload.level} Workload</span>
        </div>
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
        <li><NavLink to="/sent">Sent</NavLink></li>
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