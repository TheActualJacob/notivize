// SummaryPlaceholder: example AI-powered daily briefing panel.
// The card uses an animated border glow to indicate AI content.
import React from 'react';
import '../styles/styles.css';

function SummaryPlaceholder() {
  // TODO: Fetch AI-generated summary from the backend.
  return (
    <div className="placeholder-card summary-card ai-border-glow">
      <h2>Inbox Summary</h2>
      <div className="mock-summary-content">
        <p>Here's your morning briefing for September 21st:</p>
        <ul>
          <li><span className="summary-highlight">High Priority:</span> Project Phoenix proposal requires immediate attention - Client feedback deadline is today at 5 PM</li>
          <li><span className="summary-highlight">Meetings:</span> Q4 Product Roadmap discussion at 3 PM in Main Conference Room (or via Zoom)</li>
          <li><span className="summary-highlight">Tech Updates:</span> Successful deployment of notivize-prod branch to Vercel - All tests passing</li>
          <li><span className="summary-highlight">Team Updates:</span> Sarah's UX research findings presentation scheduled for tomorrow at 11 AM</li>
          <li><span className="summary-highlight">Deadlines:</span> Monthly analytics report due by end of day, marketing team awaiting input</li>
        </ul>
        <p>You have 3 emails marked as urgent and 2 pending calendar invites requiring response.</p>
      </div>
    </div>
  );
}

export default SummaryPlaceholder;