// Shared mock emails used by the unified Emails view and header counts.
// Each item: { id, sender, subject, body, urgency: 'high'|'medium'|'low' }
export const mockEmails = [
  { id: 1, sender: 'GitHub', subject: 'Your weekly digest', body: 'Here\'s your GitHub weekly digest summary with repository activity, pull requests, and contributions from your watched repositories.', urgency: 'low' },
  { id: 2, sender: 'Vercel', subject: 'Deployment Succeeded: notivize-prod', body: 'Your Vercel deployment succeeded for project notivize-prod. The application is now live and accessible.', urgency: 'medium' },
  { id: 3, sender: 'Team Meeting', subject: 'Sync up for Q4 Roadmap', body: 'Reminder: Q4 Roadmap sync is scheduled for tomorrow at 10 AM. Please review the agenda and come prepared with your updates.', urgency: 'medium' },
  { id: 4, sender: 'Slack', subject: 'You have a new message from John', body: 'John: Hey, can you review the latest design mockups? I need feedback before the client presentation. ck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentationck before the client presentation', urgency: 'medium' },
  { id: 5, sender: 'Client Support', subject: 'URGENT: Issue with API Key', body: 'Our client API key is failing in production — needs immediate attention. Users are experiencing authentication failures.', urgency: 'high' },
  { id: 6, sender: 'John Doe', subject: 'Re: Project Phoenix Proposal', body: 'Please review the updated proposal draft before the deadline. I\'ve incorporated the feedback from our last meeting.', urgency: 'high' },
  { id: 7, sender: 'HR Department', subject: 'Action Required: Complete your benefits enrollment', body: 'You must complete your benefits enrollment by the end of this week. Login to the portal to review your options.', urgency: 'medium' },
  { id: 8, sender: 'Figma', subject: 'Your weekly update', body: 'Here\'s your weekly Figma design update summary with recent files, comments, and team activity.', urgency: 'low' },
  { id: 9, sender: 'AWS Billing', subject: 'Monthly AWS Bill Available', body: 'Your AWS bill for this month is ready for review. Total charges: $127.43. View detailed usage breakdown in the console.', urgency: 'low' },
  { id: 10, sender: 'Security Team', subject: 'CRITICAL: Suspicious login attempt detected', body: 'We detected a suspicious login attempt from an unrecognized device in Russia. Please change your password immediately.', urgency: 'high' },
  { id: 11, sender: 'Product Manager', subject: 'Sprint Review Tomorrow', body: 'Don\'t forget about tomorrow\'s sprint review at 2 PM. Please have your demo ready and prepare to discuss blockers.', urgency: 'medium' },
  { id: 12, sender: 'LinkedIn', subject: 'You have new profile views', body: 'Your LinkedIn profile was viewed by 12 people this week, including hiring managers from top tech companies.', urgency: 'low' },
  { id: 13, sender: 'Database Alert', subject: 'URGENT: Database connection timeout', body: 'Multiple database connection timeouts detected in production. Response times are degraded. Immediate investigation required.', urgency: 'high' },
  { id: 14, sender: 'Marketing Team', subject: 'Campaign Performance Report', body: 'Q3 marketing campaign results are in. Overall conversion rate increased by 23%. Full report attached for review.', urgency: 'low' },
  { id: 15, sender: 'System Admin', subject: 'Server maintenance scheduled', body: 'Scheduled server maintenance this Sunday from 2 AM to 6 AM EST. Services may be intermittently unavailable.', urgency: 'medium' },
  { id: 16, sender: 'Client Relations', subject: 'URGENT: Client escalation requires attention', body: 'Major client is threatening to cancel contract due to recent service issues. Need immediate response and action plan.', urgency: 'high' },
  { id: 17, sender: 'Legal Department', subject: 'Contract review needed', body: 'New vendor contract requires legal review before signing. Please review terms and conditions by Friday.', urgency: 'medium' },
  { id: 18, sender: 'Google Analytics', subject: 'Weekly website traffic report', body: 'Your website received 15,234 visitors this week, with a 34% increase in organic traffic compared to last week.', urgency: 'low' },
  { id: 19, sender: 'Finance Team', subject: 'Q3 Budget Review Meeting', body: 'Quarterly budget review meeting scheduled for next Tuesday. Please prepare your department\'s spending summary.', urgency: 'medium' },
  { id: 20, sender: 'IT Support', subject: 'Password expiration reminder', body: 'Your corporate password expires in 3 days. Please update it using the self-service portal to avoid account lockout.', urgency: 'low' }
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
