// EmailsView: unified inbox with sorting + preview.
// - Sort: urgency (default) or chronological
// - Preview: email details + AI summary (loading shimmer then text)
// - Visual AI cues: glowing select dot, rainbow border for summary
import React, { useEffect, useMemo, useState } from 'react';
import '../styles/styles.css';
import { mockEmails } from '../data/mockData';

// Options for the sort dropdown
const sortOptions = [
  { value: 'urgency', label: 'Urgency' },
  { value: 'chronological', label: 'Chronological' },
];

// Urgency ordering weight for sorting (high > medium > low)
const urgencyOrder = { high: 3, medium: 2, low: 1 };

function EmailsView() {
  // sortBy: current sort selection for the list
  const [sortBy, setSortBy] = useState('urgency');
  // selectedEmail: currently focused email in the preview
  const [selectedEmail, setSelectedEmail] = useState(mockEmails[0]);
  // aiLoading: controls shimmer vs content for the AI summary block
  const [aiLoading, setAiLoading] = useState(true);

  // Derive the list according to current sort
  const sortedEmails = useMemo(() => {
    if (sortBy === 'urgency') {
      return [...mockEmails].sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
    }
    // chronological: newest first by id as a proxy
    return [...mockEmails].sort((a, b) => b.id - a.id);
  }, [sortBy]);

  // Reset loading shimmer whenever the selected email changes
  useEffect(() => {
    setAiLoading(true);
    const t = setTimeout(() => setAiLoading(false), 3000);
    return () => clearTimeout(t);
  }, [selectedEmail?.id]);

  return (
    <div className="emails-wrapper">
      <div className="emails-header">
        <h2>Emails</h2>
        <div className={`emails-sort-wrapper ${sortBy === 'urgency' ? 'is-urgency' : ''}`}>
          <span className="ai-dot" aria-hidden="true"></span>
          <span className={`ai-label ${sortBy === 'urgency' ? 'glow' : ''}`}>
            {sortOptions.find(o => o.value === sortBy)?.label}
          </span>
          <select
            className="emails-sort-select-native"
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sort emails"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="emails-container">
        <div className="placeholder-card emails-list">
          <ul className="mock-list">
            {sortedEmails.map(email => (
              <li
                key={email.id}
                className={`mock-list-item ${sortBy === 'urgency' ? `urgent-mode urgency-${email.urgency}` : ''} ${selectedEmail?.id === email.id ? 'active' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="email-list-row">
                  <div className="email-list-item-content">
                    <div className="email-sender">{email.sender}</div>
                    <div className="email-subject">{email.subject}</div>
                  </div>
                  {sortBy === 'urgency' && (
                    <span className={`urgency-indicator urgency-${email.urgency}`}>{email.urgency.toUpperCase()}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-card emails-preview">
          {selectedEmail ? (
            <>
              <h3>{selectedEmail.subject}</h3>
              <p><strong>From:</strong> {selectedEmail.sender}</p>
              <p>{selectedEmail.body}</p>
              <div className={`ai-summary-card ${aiLoading ? 'loading' : 'loaded'}`} role="status" aria-live="polite">
                <div className="ai-summary-label">
                  <span className="ai-dot" aria-hidden="true"></span>
                  <span>AI Summary (preview)</span>
                </div>
                {aiLoading ? (
                  <div className="ai-summary-loading">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line short"></div>
                  </div>
                ) : (
                  <div className="ai-summary-content">
                    This message appears to concern scheduling and deadlines. A concise follow-up confirming availability and next steps is recommended.
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Select an email to view its content</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmailsView;
