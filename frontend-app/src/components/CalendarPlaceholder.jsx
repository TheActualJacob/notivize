import React from 'react';
import '../styles/styles.css';

function CalendarPlaceholder() {
  // TODO: Fetch real calendar events from an API.
  const events = { 3: true, 10: true, 21: true };
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="placeholder-card">
      <h2>Calendar</h2>
      <p>Calendar integration with Google Calendar and Outlook is coming soon.</p>
      <div className="calendar-grid">
        {days.map(day => (
          <div key={day} className={`calendar-day ${events[day] ? 'has-event' : ''}`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarPlaceholder;