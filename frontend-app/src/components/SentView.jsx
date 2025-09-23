// SentView: sent emails inbox with sorting + preview.
// - Sort: chronological (default) or urgency 
// - Preview: email details + AI summary (loading shimmer then text)
// - Visual AI cues: glowing select dot, rainbow border for summary
import React, { useEffect, useMemo, useState } from 'react';
import '../styles/styles.css';

// Mock sent emails data (will be replaced with real data later)
const mockSentEmails = [
  {
    id: 'sent-1',
    recipient: 'client@techcorp.com',
    subject: 'Project Timeline Update - Q4 Deliverables',
    body: 'Thank you for your patience regarding the Q4 project timeline. After careful review with our development team, I am pleased to provide you with an updated schedule that addresses the recent milestone adjustments...',
    date: new Date('2024-01-15T10:30:00'),
    timestamp: '10:30 AM',
    urgency: 'high',
    status: 'delivered'
  },
  {
    id: 'sent-2',
    recipient: 'team@company.com',
    subject: 'Weekly Team Sync - Action Items',
    body: 'Here are the key action items from our weekly team sync meeting. Please review and confirm your assigned tasks by end of week...',
    date: new Date('2024-01-14T14:15:00'),
    timestamp: '2:15 PM',
    urgency: 'medium',
    status: 'delivered'
  },
  {
    id: 'sent-3',
    recipient: 'support@vendor.com',
    subject: 'API Integration Documentation Request',
    body: 'We are currently implementing your API for our customer portal and would appreciate updated documentation for the authentication endpoints...',
    date: new Date('2024-01-13T09:45:00'),
    timestamp: '9:45 AM',
    urgency: 'low',
    status: 'delivered'
  },
  {
    id: 'sent-4',
    recipient: 'hr@company.com',
    subject: 'Leave Request - February 20-22',
    body: 'I would like to request time off for February 20-22 for a family commitment. I have coordinated with my team to ensure coverage...',
    date: new Date('2024-01-12T16:20:00'),
    timestamp: '4:20 PM',
    urgency: 'low',
    status: 'delivered'
  },
  {
    id: 'sent-5',
    recipient: 'legal@company.com',
    subject: 'Contract Review Required - Vendor Agreement',
    body: 'Please review the attached vendor agreement for compliance and provide feedback. This is for our new cloud infrastructure provider...',
    date: new Date('2024-01-11T11:00:00'),
    timestamp: '11:00 AM',
    urgency: 'high',
    status: 'delivered'
  }
];

// Options for the sort dropdown - only chronological for sent emails
const sortOptions = [
  { value: 'chronological', label: 'Chronological' },
];

// Urgency ordering weight for sorting (high > medium > low)
const urgencyOrder = { high: 3, medium: 2, low: 1 };

// Format date for display
const formatEmailDate = (date) => {
  const now = new Date();
  const diff = now - date;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

function SentView() {
  // sortBy: current sort selection for the list
  const [sortBy, setSortBy] = useState('chronological');
  // selectedEmail: currently focused email in the preview
  const [selectedEmail, setSelectedEmail] = useState(mockSentEmails[0]);
  // aiLoading: controls shimmer vs content for the AI summary block
  const [aiLoading, setAiLoading] = useState(true);
  // searchQuery: controls the search functionality
  const [searchQuery, setSearchQuery] = useState('');
  // composeExpanded: controls the compose email interface
  const [composeExpanded, setComposeExpanded] = useState(false);
  // composeData: holds the draft email content
  const [composeData, setComposeData] = useState({
    to: '',
    subject: '',
    body: ''
  });
  // AI suggestions for compose fields
  const [suggestion, setSuggestion] = useState('');
  const [subjectSuggestion, setSubjectSuggestion] = useState('');
  const [bodySuggestion, setBodySuggestion] = useState('');

  // Placeholder suggestion data (will be replaced with AI later)
  const subjectSuggestions = [
    "Follow-up on our previous discussion",
    "Quick update on project status",
    "Meeting recap and next steps",
    "Document review request",
    "Schedule confirmation",
    "Thank you for your time",
    "Project milestone update"
  ];

  const bodySuggestions = [
    "Thank you for taking the time to meet with me yesterday. I wanted to follow up on our discussion about...",
    "I hope this email finds you well. I'm writing to provide an update on the current project status...",
    "Following our conversation, I wanted to summarize the key points and outline the next steps...",
    "I wanted to reach out regarding the upcoming deadline and confirm our approach moving forward...",
    "Thank you for your patience as we work through these requirements. I have an update to share..."
  ];

  // AI suggestion logic
  useEffect(() => {
    if (composeData.to && !suggestion) {
      // Simulate AI suggestion delay
      const timer = setTimeout(() => {
        const suggestions = ['john.doe@company.com', 'sarah.smith@client.com', 'team@department.org'];
        const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
        if (!composeData.to.includes('@')) {
          setSuggestion(randomSuggestion);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [composeData.to, suggestion]);

  useEffect(() => {
    if (composeData.subject && !subjectSuggestion) {
      const timer = setTimeout(() => {
        const randomSuggestion = subjectSuggestions[Math.floor(Math.random() * subjectSuggestions.length)];
        setSubjectSuggestion(randomSuggestion);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [composeData.subject, subjectSuggestion, subjectSuggestions]);

  useEffect(() => {
    if (composeData.body && !bodySuggestion) {
      const timer = setTimeout(() => {
        const randomSuggestion = bodySuggestions[Math.floor(Math.random() * bodySuggestions.length)];
        setBodySuggestion(randomSuggestion);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [composeData.body, bodySuggestion, bodySuggestions]);

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

  // AI summary simulation - consistent with EmailsView timing
  useEffect(() => {
    setAiLoading(true);
    const timer = setTimeout(() => setAiLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [selectedEmail?.id]);

  // Clear search
  const clearSearch = () => setSearchQuery('');

  // Filter emails based on search criteria (always chronological sort)
  const filteredAndSortedEmails = useMemo(() => {
    let filtered = mockSentEmails;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(email => 
        email.recipient.toLowerCase().includes(query) ||
        email.subject.toLowerCase().includes(query) ||
        email.body.toLowerCase().includes(query)
      );
    }
    
    // Always sort chronologically (newest first)
    return [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [searchQuery]);

  return (
    <div className="emails-wrapper">
      {/* Backdrop Overlay */}
      <div 
        className={`compose-backdrop ${composeExpanded ? 'visible' : ''}`}
        onClick={() => setComposeExpanded(false)}
      ></div>
      
      {/* Expanding Compose Form */}
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
                {suggestion && (
                  <button 
                    className="ai-suggestion-inline"
                    onClick={acceptSuggestion}
                    title="Accept AI suggestion"
                  >
                    ✨ {suggestion}
                  </button>
                )}
              </div>
            </div>
            
            <div className="compose-field">
              <label htmlFor="compose-subject">Subject:</label>
              <div className="compose-subject-container">
                <input
                  id="compose-subject"
                  type="text"
                  value={composeData.subject}
                  onChange={(e) => handleComposeChange('subject', e.target.value)}
                  placeholder="Subject line"
                />
                {subjectSuggestion && (
                  <button 
                    className="ai-suggestion-inline"
                    onClick={acceptSubjectSuggestion}
                    title="Accept AI suggestion"
                  >
                    ✨ {subjectSuggestion}
                  </button>
                )}
              </div>
            </div>
            
            <div className="compose-field">
              <label htmlFor="compose-body">Message:</label>
              <div className="compose-body-container">
                <textarea
                  id="compose-body"
                  value={composeData.body}
                  onChange={(e) => handleComposeChange('body', e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                />
                {bodySuggestion && (
                  <button 
                    className="ai-suggestion-inline body-suggestion"
                    onClick={acceptBodySuggestion}
                    title="Accept AI suggestion"
                  >
                    ✨ {bodySuggestion}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="compose-actions">
            <button 
              className="send-button primary-button"
              onClick={handleSendEmail}
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
        <h2>Sent</h2>
        
        {/* Search Bar */}
        <div className="emails-search-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <input
              type="text"
              className="emails-search-input"
              placeholder="Search sent emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="search-clear-btn"
                onClick={clearSearch}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
        
        <div className="emails-header-actions">
          <div className="emails-sort-wrapper">
            <span className="ai-dot" aria-hidden="true"></span>
            <span className="ai-label">
              {sortOptions.find(o => o.value === sortBy)?.label}
            </span>
            <select
              className="emails-sort-select-native"
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort sent emails"
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
            {filteredAndSortedEmails.map(email => (
              <li
                key={email.id}
                className={`mock-list-item ${selectedEmail?.id === email.id ? 'active' : ''}`}
                onClick={() => setSelectedEmail(email)}
              >
                <div className="email-list-row">
                  <div className="email-list-item-content">
                    <div className="email-sender">To: {email.recipient}</div>
                    <div className="email-subject">{email.subject}</div>
                  </div>
                  <div className="email-list-meta">
                    <div className="email-timestamp">
                      {sortBy === 'chronological' ? formatEmailDate(email.date) : email.timestamp}
                    </div>
                    <div className="email-status sent-status">
                      ✓ {email.status}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-card emails-preview">
          {selectedEmail && (
            <div className="email-preview-content">
              <div className="email-preview-header">
                <h3>{selectedEmail.subject}</h3>
                <div className="email-preview-meta">
                  <p><strong>To:</strong> {selectedEmail.recipient}</p>
                  <p><strong>Date:</strong> {selectedEmail.date.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                  <p><strong>Status:</strong> <span className="email-status-detail">{selectedEmail.status}</span></p>
                </div>
              </div>
              <div className="email-preview-body">
                <p>{selectedEmail.body}</p>
              </div>
              
              {/* AI Summary Section */}
              <div className={`ai-summary-card ${aiLoading ? 'loading' : 'loaded'}`} role="status" aria-live="polite">
                <div className="ai-summary-label">
                  <span className="ai-summary-dot"></span>
                  AI Summary
                </div>
                {aiLoading ? (
                  <div className="ai-summary-loading">
                    <div className="line"></div>
                    <div className="line short"></div>
                    <div className="line"></div>
                  </div>
                ) : (
                  <div className="ai-summary-content">
                    Professional outbound communication regarding {selectedEmail.subject.toLowerCase()}. 
                    Key action items communicated with clear expectations and timeline. 
                    Maintains professional tone while ensuring recipient clarity on next steps.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SentView;