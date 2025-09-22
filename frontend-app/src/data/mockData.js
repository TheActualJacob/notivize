// Shared mock data for emails across the application
export const mockEmails = [
  { 
    id: 1, 
    sender: 'GitHub', 
    subject: 'Your weekly digest', 
    body: 'Here\'s your GitHub weekly digest summary with repository activity, pull requests, and contributions from your watched repositories.', 
    urgency: 'low',
    date: new Date('2025-09-22T09:15:00'),
    timestamp: '9:15 AM'
  },
  { 
    id: 2, 
    sender: 'Client Success Team', 
    subject: 'Client Concern: Request for Updated Delivery Schedule', 
    body: 'Hi Team, Our client has reached out regarding the Q4 release and has expressed concern about the delivery schedule. They noted that several milestones from the last sprint slipped, and they want reassurance that the overall launch date will still be achievable. Specifically, they/’ve asked for a revised timeline that reflects current progress, risks, and any potential blockers. They also mentioned that their leadership team is planning a customer-facing announcement, so they require clarity on whether they can safely move forward with that communication. Could the product and engineering leads please review current velocity and provide an updated projection by the end of this week? A concise status update with next steps would help us maintain client confidence. Thank you, Client Success', 
    urgency: 'medium',
    date: new Date('2025-09-22T14:32:00'),
    timestamp: '2:32 PM'
  },
  { 
    id: 3, 
    sender: 'Team Meeting', 
    subject: 'Sync up for Q4 Roadmap', 
    body: 'Reminder: Q4 Roadmap sync is scheduled for tomorrow at 10 AM. Please review the agenda and come prepared with your updates.', 
    urgency: 'medium',
    date: new Date('2025-09-22T08:45:00'),
    timestamp: '8:45 AM'
  },
  { 
    id: 4, 
    sender: 'Slack', 
    subject: 'You have a new message from John', 
    body: 'John: Hey, can you review the latest design mockups? I need feedback before the client presentation. ck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentation', 
    urgency: 'medium',
    date: new Date('2025-09-21T16:20:00'),
    timestamp: '4:20 PM'
  },
  { 
    id: 5, 
    sender: 'Client Support', 
    subject: 'URGENT: Issue with API Key', 
    body: 'Our client API key is failing in production — needs immediate attention. Users are experiencing authentication failures.', 
    urgency: 'high',
    date: new Date('2025-09-22T11:03:00'),
    timestamp: '11:03 AM'
  },
  { 
    id: 6, 
    sender: 'John Doe', 
    subject: 'Re: Project Phoenix Proposal', 
    body: 'Please review the updated proposal draft before the deadline. I\'ve incorporated the feedback from our last meeting.', 
    urgency: 'high',
    date: new Date('2025-09-21T13:15:00'),
    timestamp: '1:15 PM'
  },
  { 
    id: 7, 
    sender: 'HR Department', 
    subject: 'Action Required: Complete your benefits enrollment', 
    body: 'You must complete your benefits enrollment by the end of this week. Login to the portal to review your options.', 
    urgency: 'medium',
    date: new Date('2025-09-20T10:30:00'),
    timestamp: '10:30 AM'
  },
  { 
    id: 8, 
    sender: 'Figma', 
    subject: 'Your weekly update', 
    body: 'Here\'s your weekly Figma design update summary with recent files, comments, and team activity.', 
    urgency: 'low',
    date: new Date('2025-09-21T07:00:00'),
    timestamp: '7:00 AM'
  },
  { 
    id: 9, 
    sender: 'AWS Billing', 
    subject: 'Monthly AWS Bill Available', 
    body: 'Your AWS bill for this month is ready for review. Total charges: $127.43. View detailed usage breakdown in the console.', 
    urgency: 'low',
    date: new Date('2025-09-20T15:45:00'),
    timestamp: '3:45 PM'
  },
  { 
    id: 10, 
    sender: 'Security Team', 
    subject: 'CRITICAL: Suspicious login attempt detected', 
    body: 'We detected a suspicious login attempt from an unrecognized device in Russia. Please change your password immediately.', 
    urgency: 'high',
    date: new Date('2025-09-22T15:18:00'),
    timestamp: '3:18 PM'
  },
  { 
    id: 11, 
    sender: 'Product Manager', 
    subject: 'Sprint Review Tomorrow', 
    body: 'Don\'t forget about tomorrow\'s sprint review at 2 PM. Please have your demo ready and prepare to discuss blockers.', 
    urgency: 'medium',
    date: new Date('2025-09-21T17:30:00'),
    timestamp: '5:30 PM'
  },
  { 
    id: 12, 
    sender: 'LinkedIn', 
    subject: 'You have new profile views', 
    body: 'Your LinkedIn profile was viewed by 12 people this week, including hiring managers from top tech companies.', 
    urgency: 'low',
    date: new Date('2025-09-20T12:00:00'),
    timestamp: '12:00 PM'
  },
  { 
    id: 13, 
    sender: 'Database Alert', 
    subject: 'URGENT: Database connection timeout', 
    body: 'Multiple database connection timeouts detected in production. Response times are degraded. Immediate investigation required.', 
    urgency: 'high',
    date: new Date('2025-09-22T16:45:00'),
    timestamp: '4:45 PM'
  },
  { 
    id: 14, 
    sender: 'Marketing Team', 
    subject: 'Campaign Performance Report', 
    body: 'Q3 marketing campaign results are in. Overall conversion rate increased by 23%. Full report attached for review.', 
    urgency: 'low',
    date: new Date('2025-09-19T14:15:00'),
    timestamp: '2:15 PM'
  },
  { 
    id: 15, 
    sender: 'System Admin', 
    subject: 'Server maintenance scheduled', 
    body: 'Scheduled server maintenance this Sunday from 2 AM to 6 AM EST. Services may be intermittently unavailable.', 
    urgency: 'medium',
    date: new Date('2025-09-20T09:20:00'),
    timestamp: '9:20 AM'
  },
  { 
    id: 16, 
    sender: 'Client Relations', 
    subject: 'URGENT: Client escalation requires attention', 
    body: 'Major client is threatening to cancel contract due to recent service issues. Need immediate response and action plan.', 
    urgency: 'high',
    date: new Date('2025-09-22T13:55:00'),
    timestamp: '1:55 PM'
  },
  { 
    id: 17, 
    sender: 'Legal Department', 
    subject: 'Contract review needed', 
    body: 'New vendor contract requires legal review before signing. Please review terms and conditions by Friday.', 
    urgency: 'medium',
    date: new Date('2025-09-21T11:10:00'),
    timestamp: '11:10 AM'
  },
  { 
    id: 18, 
    sender: 'Google Analytics', 
    subject: 'Weekly website traffic report', 
    body: 'Your website received 15,234 visitors this week, with a 34% increase in organic traffic compared to last week.', 
    urgency: 'low',
    date: new Date('2025-09-21T06:30:00'),
    timestamp: '6:30 AM'
  },
  { 
    id: 19, 
    sender: 'Finance Team', 
    subject: 'Q3 Budget Review Meeting', 
    body: 'Quarterly budget review meeting scheduled for next Tuesday. Please prepare your department\'s spending summary.', 
    urgency: 'medium',
    date: new Date('2025-09-20T14:40:00'),
    timestamp: '2:40 PM'
  },
  { 
    id: 20, 
    sender: 'IT Support', 
    subject: 'Password expiration reminder', 
    body: 'Your corporate password expires in 3 days. Please update it using the self-service portal to avoid account lockout.', 
    urgency: 'low',
    date: new Date('2025-09-19T16:25:00'),
    timestamp: '4:25 PM'
  }
];

// Filter emails by urgency level
export const getEmailsByUrgency = (urgencyLevel) => 
  mockEmails.filter(email => email.urgency === urgencyLevel);

// Get all urgent emails (high and medium priority)
export const getUrgentEmails = () => 
  mockEmails.filter(email => email.urgency === 'high' || email.urgency === 'medium');

// Get all emails sorted by urgency (high -> medium -> low)
export const getEmailsSortedByUrgency = () => {
  const urgencyOrder = { high: 3, medium: 2, low: 1 };
  return [...mockEmails].sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
};

// Get all emails sorted chronologically (newest first)
export const getEmailsSortedByDate = () => {
  return [...mockEmails].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Helper function to format date for display
export const formatEmailDate = (date) => {
  const now = new Date();
  const emailDate = new Date(date);
  const diffTime = Math.abs(now - emailDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return emailDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: emailDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
};
