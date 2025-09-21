import React from 'react';
import '../styles/styles.css';

function CalendarPlaceholder() {
  // Mock calendar events
  const events = {
    3: [{ type: 'meeting', title: 'Team Sync' }],
    10: [{ type: 'deadline', title: 'Report Due' }],
    15: [
      { type: 'meeting', title: 'Client Call' },
      { type: 'reminder', title: 'Review PR' }
    ],
    21: [
      { type: 'meeting', title: 'Q4 Planning' },
      { type: 'deadline', title: 'Project Due' }
    ],
    25: [{ type: 'reminder', title: 'Team Review' }],
    28: [{ type: 'meeting', title: 'All Hands' }]
  };
  
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="placeholder-card">
      <h2>Calendar</h2>
      <p>Calendar integration with Google Calendar and Outlook is coming soon.</p>
      <div className="calendar-grid">
        {days.map(day => (
          <div key={day} className={`calendar-day ${events[day] ? 'has-event' : ''}`}>
            <div className="calendar-date">{day}</div>
            {events[day]?.map((event, index) => (
              <div key={index} className={`calendar-event ${event.type}`}>
                {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarPlaceholder;