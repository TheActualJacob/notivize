import React from 'react';
import '../styles/styles.css';

function SummaryPlaceholder() {
  // TODO: Fetch AI-generated summary from the backend.
  const mockSummary = "Today's key highlights: The Q4 roadmap discussion is scheduled for 3 PM. Vercel deployment for the 'notivize-prod' branch was successful. You have an urgent follow-up required for the Project Phoenix proposal.";

  return (
    <div className="placeholder-card">
      <h2>Inbox Summary</h2>
      <p>This component will display an AI-generated summary of your most important emails for the day.</p>
      <div className="mock-summary-content" style={{ marginTop: '1rem', fontStyle: 'italic', color: '#D1D5DB' }}>
        <p>{mockSummary}</p>
      </div>
    </div>
  );
}

export default SummaryPlaceholder;