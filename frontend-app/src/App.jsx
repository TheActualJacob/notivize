import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './styles/styles.css';

import InboxPlaceholder from './components/InboxPlaceholder';

const mockEmails = [
  { id: 1, sender: 'GitHub', subject: 'Your weekly digest' },
  { id: 2, sender: 'Vercel', subject: 'Deployment Succeeded: notivize-prod' },
  { id: 3, sender: 'Team Meeting', subject: 'Sync up for Q4 Roadmap' },
  { id: 4, sender: 'Slack', subject: 'You have a new message from John' },
];

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