import React, { useState } from 'react';
import '../styles/styles.css';

const mockEmails = [
  { id: 1, sender: 'GitHub', subject: 'Your weekly digest', body: 'Here’s your GitHub weekly digest summary...' },
  { id: 2, sender: 'Vercel', subject: 'Deployment Succeeded: notivize-prod', body: 'Your Vercel deployment succeeded for project notivize-prod.' },
  { id: 3, sender: 'Team Meeting', subject: 'Sync up for Q4 Roadmap', body: 'Reminder: Q4 Roadmap sync is scheduled for tomorrow at 10 AM.' },
  { id: 4, sender: 'Slack', subject: 'You have a new message from John', body: 'John: Hey, can you review the latest design mockups?' },
];

function InboxPlaceholder() {
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);

  return (
    <div className="inbox-wrapper">
      {/* Overarching Header */}
      <div className="inbox-header">
        <h2>Inbox</h2>
      </div>

      {/* Two-column inbox layout */}
      <div className="inbox-container">
        {/* Left column: email list */}
        <div className="placeholder-card email-list">
          <ul className="mock-list">
            {mockEmails.map(email => (
              <li
                key={email.id}
                className={`mock-list-item ${selectedEmail.id === email.id ? 'active' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div>
                  <div className="email-sender">{email.sender}</div>
                  <div className="email-subject">{email.subject}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: email preview */}
        <div className="placeholder-card email-preview">
          {selectedEmail ? (
            <>
              <h3>{selectedEmail.subject}</h3>
              <p><strong>From:</strong> {selectedEmail.sender}</p>
              <p>{selectedEmail.body}</p>
            </>
          ) : (
            <p>Select an email to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InboxPlaceholder;
