// EmailsView: unified inbox with sorting + preview.
// - Sort: urgency (default) or chronological
// - Preview: email details + AI summary (loading shimmer then text)
// - Visual AI cues: glowing select dot, rainbow border for summary
import React, { useEffect, useMemo, useState } from 'react';
import '../styles/styles.css';
import { mockEmails, formatEmailDate } from '../data/mockData';

// Options for the sort dropdown
const sortOptions = [
  { value: 'urgency', label: 'Priority' },
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
  // composeExpanded: controls the compose email interface
  const [composeExpanded, setComposeExpanded] = useState(false);
  // composeData: holds the draft email content
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  // suggestion: holds the suggested recipient
  const [suggestion, setSuggestion] = useState('');
  // AI suggestions for subject and body (placeholder data for now)
  const [subjectSuggestion, setSubjectSuggestion] = useState('');
  const [bodySuggestion, setBodySuggestion] = useState('');
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder suggestion data (will be replaced with AI later)
  const subjectSuggestions = [
    "Re: Following up on our previous discussion",
    "Quick question about your email",
    "Thank you for your message",
    "Re: Next steps and timeline",
    "Following up on your request",
    "Clarification needed",
    "Re: Your recent inquiry"
  ];

  const bodySuggestions = [
    "Hi there,\n\nThank you for your email. I wanted to follow up on the points you mentioned.\n\nLooking forward to hearing from you.\n\nBest regards,",
    "Hi there,\n\nThank you for flagging this issue. I&apos;m joining the incident bridge now and will start by pulling recent query traces and monitoring snapshots for CPU, IOPS, and replication lag.\n\nCould you please share the batch job ID that started around 14:30 UTC, along with any deployment notes from today?\n\nI&apos;ll also loop in the on-call DBA and escalate to tier-2 if we don&apos;t see improvement within the next 10 minutes.\n\nBest regards,",
    "Hi,\n\nThanks for reaching out. I've reviewed your message and have some thoughts to share.\n\nI'd be happy to discuss this further at your convenience.\n\nRegards,",
    "Dear colleague,\n\nI appreciate you taking the time to write. Your message raises some important points that I'd like to address.\n\nLet's schedule a time to discuss this in more detail.\n\nSincerely,",
    "Hello,\n\nThank you for your email. I understand your concerns and would like to provide some clarity on the matter.\n\nI'm available for a call if you'd prefer to discuss this verbally.\n\nBest wishes,"
  ];

  // Derive the list according to current sort
  const sortedEmails = useMemo(() => {
    if (sortBy === 'urgency') {
      return [...mockEmails].sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
    }
    // chronological: newest first by actual date
    return [...mockEmails].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [sortBy]);

  // Reset loading shimmer whenever the selected email changes
  useEffect(() => {
    setAiLoading(true);
    const t = setTimeout(() => setAiLoading(false), 3000);
    return () => clearTimeout(t);
  }, [selectedEmail?.id]);

  // Set suggestion when compose opens and clear form when closed or email changes
  useEffect(() => {
    if (composeExpanded && selectedEmail && !composeData.to) {
      setSuggestion(selectedEmail.sender);
      // Generate AI suggestions for subject and body
      setSubjectSuggestion(subjectSuggestions[Math.floor(Math.random() * subjectSuggestions.length)]);
      setBodySuggestion(bodySuggestions[Math.floor(Math.random() * bodySuggestions.length)]);
    } else if (!composeExpanded) {
      setSuggestion('');
      setSubjectSuggestion('');
      setBodySuggestion('');
      // Clear all compose fields when form is closed
      setComposeData({ to: '', subject: '', body: '' });
    }
  }, [composeExpanded, selectedEmail, composeData.to]);

  // Clear compose form when selected email changes
  useEffect(() => {
    setComposeData({ to: '', subject: '', body: '' });
    setSuggestion('');
    setSubjectSuggestion('');
    setBodySuggestion('');
  }, [selectedEmail?.id]);

  // Handle compose form updates
  const handleComposeChange = (field, value) => {
    setComposeData(prev => ({ ...prev, [field]: value }));
    if (field === 'to' && value) {
      setSuggestion(''); // Clear suggestion when user types
    } else if (field === 'subject' && value) {
      setSubjectSuggestion(''); // Clear subject suggestion when user types
    } else if (field === 'body' && value) {
      setBodySuggestion(''); // Clear body suggestion when user types
    }
  };

  // Accept the suggested recipient
  const acceptSuggestion = () => {
    setComposeData(prev => ({ ...prev, to: suggestion }));
    setSuggestion('');
  };

  // Accept the suggested subject
  const acceptSubjectSuggestion = () => {
    setComposeData(prev => ({ ...prev, subject: subjectSuggestion }));
    setSubjectSuggestion('');
  };

  // Accept the suggested body
  const acceptBodySuggestion = () => {
    setComposeData(prev => ({ ...prev, body: bodySuggestion }));
    setBodySuggestion('');
  };

  // Handle send email (placeholder functionality)
  const handleSendEmail = () => {
    console.log('Sending email:', composeData);
    // Add your email sending logic here
    setComposeData({ to: '', subject: '', body: '' });
    setComposeExpanded(false);
  };

  return (
    <div className="emails-wrapper">
      {/* Backdrop Overlay */}
      <div 
        className={`compose-backdrop ${composeExpanded ? 'visible' : ''}`}
        onClick={() => setComposeExpanded(false)}
      ></div>
      
      {/* Compose Button - Floating */}
        <div className={`compose-form-container ${composeExpanded ? 'visible' : ''}`}>
          <div className="compose-form">
            <div className="compose-header">
              <h3>New Message</h3>
              <button 
                className="close-compose"
                onClick={() => setComposeExpanded(false)}
                aria-label="Close compose"
              >
                ×
              </button>
            </div>
            
            <div className="compose-fields">
              <div className="compose-field">
                <label htmlFor="compose-to">To:</label>
                <div className="compose-to-container">
                  <input
                    id="compose-to"
                    type="email"
                    value={composeData.to}
                    onChange={(e) => handleComposeChange('to', e.target.value)}
                    placeholder="recipient@example.com"
                  />
                  {suggestion && !composeData.to && (
                    <div className="email-suggestion recipient-suggestion" onClick={acceptSuggestion}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>AI suggests reply to: {suggestion}</span>
                      <span className="ai-badge">AI</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="compose-field">
                <label htmlFor="compose-subject">Subject:</label>
                <div className="input-with-ai">
                  <input
                    id="compose-subject"
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => handleComposeChange('subject', e.target.value)}
                    placeholder={subjectSuggestion || "Enter subject"}
                  />
                  {subjectSuggestion && !composeData.subject && (
                    <button 
                      className="ai-accept-btn"
                      onClick={acceptSubjectSuggestion}
                      title="Accept AI suggestion"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="ai-label">AI</span>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="compose-field compose-body-field">
                <label htmlFor="compose-body">Message:</label>
                <div className="input-with-ai">
                  <textarea
                    id="compose-body"
                    value={composeData.body}
                    onChange={(e) => handleComposeChange('body', e.target.value)}
                    placeholder={bodySuggestion || "Type your message..."}
                    rows="8"
                  />
                  {bodySuggestion && !composeData.body && (
                    <button 
                      className="ai-accept-btn body-ai-btn"
                      onClick={acceptBodySuggestion}
                      title="Accept AI message template"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L2 7v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7l-10-5z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span className="ai-label">AI</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            <div className="compose-actions">
              <button 
                className="send-button primary-button"
                onClick={handleSendEmail}
                disabled={!composeData.to || !composeData.subject}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Send
              </button>
              <button 
                className="draft-button secondary-button"
                onClick={() => setComposeExpanded(false)}
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>

      <div className="emails-header">
        <h2>Emails</h2>
        
        {/* Search Bar */}
        <div className="emails-search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              className="emails-search-input"
              placeholder="Search emails by sender, subject, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search emails"
            />
            {searchQuery && (
              <button 
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        <div className="emails-header-actions">
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
          
          {/* Compose Button in Header */}
          <button 
            className={`compose-button-header liquid-button ${composeExpanded ? 'active' : ''}`}
            onClick={() => setComposeExpanded(!composeExpanded)}
            aria-label={composeExpanded ? "Close compose" : "Compose new email"}
          >
            {composeExpanded ? (
              <>
                <span className="compose-icon">×</span>
                <span className="compose-text">Close</span>
              </>
            ) : (
              <>
                <svg className="compose-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M3 21l1.9-5.7L18.5 1.9c.8-.8 2.1-.8 2.9 0s.8 2.1 0 2.9L7.8 18.2L3 21z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path d="M14.5 6.5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="compose-text">Compose</span>
              </>
            )}
          </button>
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
                  <div className="email-list-meta">
                    {sortBy === 'urgency' && (
                      <span className={`urgency-indicator urgency-${email.urgency}`}>{email.urgency.toUpperCase()}</span>
                    )}
                    <div className="email-timestamp">
                      {sortBy === 'chronological' ? formatEmailDate(email.date) : email.timestamp}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-card emails-preview">
          {selectedEmail ? (
            <>
              <div className="email-preview-header">
                <h3>{selectedEmail.subject}</h3>
                <div className="email-preview-meta">
                  <p><strong>From:</strong> {selectedEmail.sender}</p>
                  <p><strong>Date:</strong> {selectedEmail.date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}</p>
                </div>
              </div>
              <div className="email-preview-body">
                <p>{selectedEmail.body}</p>
              </div>
              <div className={`ai-summary-card ${aiLoading ? 'loading' : 'loaded'}`} role="status" aria-live="polite">
                <div className="ai-summary-label">
                  <span className="ai-dot" aria-hidden="true"></span>
                  <span>AI Summary</span>
                </div>
                {aiLoading ? (
                  <div className="ai-summary-loading">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line short"></div>
                  </div>
                ) : (
                  <div className="ai-summary-content">
                    The client is requesting a revised delivery timeline for the Q4 release due to recent milestone slippage. They need clarity for their own external communications and are seeking a confirmed schedule update.
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
