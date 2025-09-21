import React from 'react';
import '../styles/styles.css';

// TODO: integrate with Python backend API here to fetch real emails.
const mockEmails = [
  { id: 1, sender: 'GitHub', subject: 'Your weekly digest' },
  { id: 2, sender: 'Vercel', subject: 'Deployment Succeeded: notivize-prod' },
  { id: 3, sender: 'Team Meeting', subject: 'Sync up for Q4 Roadmap' },
  { id: 4, sender: 'Slack', subject: 'You have a new message from John' },
];

function InboxPlaceholder() {
  return (
    <div className="placeholder-card">
      <h2>Inbox</h2>
      <p>This is where your emails will be displayed once the backend is connected.</p>
      <ul className="mock-list">
        {mockEmails.map(email => (
          <li key={email.id} className="mock-list-item">
            <div>
              <div className="email-sender">{email.sender}</div>
              <div className="email-subject">{email.subject}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InboxPlaceholder;