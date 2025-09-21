import React from 'react';
import '../styles/styles.css';

// TODO: Fetch and sort emails by urgency score from the backend API.
const mockUrgentEmails = [
  { id: 1, sender: 'Client Support', subject: 'URGENT: Issue with API Key', urgency: 'high' },
  { id: 2, sender: 'John Doe', subject: 'Re: Project Phoenix Proposal', urgency: 'high' },
  { id: 3, sender: 'HR Department', subject: 'Action Required: Complete your benefits enrollment', urgency: 'medium' },
  { id: 4, sender: 'Figma', subject: 'Your weekly update', urgency: 'low' },
];

const UrgencyTag = ({ level }) => (
  <span className={`urgency-indicator urgency-${level}`}>{level.toUpperCase()}</span>
);

function UrgencyPlaceholder() {
  return (
    <div className="placeholder-card">
      <h2>Urgency View</h2>
      <p>Emails will be automatically sorted by their AI-calculated urgency score.</p>
      <ul className="mock-list">
        {mockUrgentEmails.map(email => (
          <li key={email.id} className="mock-list-item">
            <div>
              <div className="email-sender">{email.sender}</div>
              <div className="email-subject">{email.subject}</div>
            </div>
            <UrgencyTag level={email.urgency} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UrgencyPlaceholder;