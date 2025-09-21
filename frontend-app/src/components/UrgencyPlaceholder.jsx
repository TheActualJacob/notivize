import React, { useState } from 'react';
import '../styles/styles.css';

// TODO: Fetch and sort emails by urgency score from the backend API.
const mockUrgentEmails = [
  { id: 1, sender: 'Client Support', subject: 'URGENT: Issue with API Key', urgency: 'high', body: 'Our client API key is failing in production — needs immediate attention.' },
  { id: 2, sender: 'John Doe', subject: 'Re: Project Phoenix Proposal', urgency: 'high', body: 'Please review the updated proposal draft before the deadline.' },
  { id: 3, sender: 'HR Department', subject: 'Action Required: Complete your benefits enrollment', urgency: 'medium', body: 'You must complete your benefits enrollment by the end of this week.' },
  { id: 4, sender: 'Figma', subject: 'Your weekly update', urgency: 'low', body: 'Here’s your weekly Figma design update summary.' },
];

const UrgencyTag = ({ level }) => (
  <span className={`urgency-indicator urgency-${level}`}>{level.toUpperCase()}</span>
);

function UrgencyPlaceholder() {
  const [selectedEmail, setSelectedEmail] = useState(mockUrgentEmails[0]);

  return (
    <div className="urgency-wrapper">
      {/* Overarching header */}
      <div className="urgency-header">
        <h2>Urgency View</h2>
      </div>

      {/* Two-column layout */}
      <div className="urgency-container">
        {/* Left column: urgent email list */}
        <div className="placeholder-card urgency-list">
          <ul className="mock-list">
            {mockUrgentEmails.map(email => (
              <li
  key={email.id}
  className={`mock-list-item ${selectedEmail.id === email.id ? `active urgency-${email.urgency}` : ''}`}
  onClick={() => setSelectedEmail(email)}
>

                <div>
                  <div className="email-sender">{email.sender}</div>
                  <div className="email-subject">{email.subject}</div>
                </div>
                <UrgencyTag level={email.urgency} />
              </li>
            ))}
          </ul>
        </div>

        {/* Right column: email preview */}
        <div className="placeholder-card urgency-preview">
          {selectedEmail ? (
            <>
              <h3>{selectedEmail.subject}</h3>
              <p><strong>From:</strong> {selectedEmail.sender}</p>
              <p><strong>Urgency:</strong> <UrgencyTag level={selectedEmail.urgency} /></p>
              <p>{selectedEmail.body}</p>
            </>
          ) : (
            <p>Select an urgent email to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UrgencyPlaceholder;
