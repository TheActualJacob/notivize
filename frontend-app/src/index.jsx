// Entry: router setup for app sections; '/' redirects to '/emails'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import EmailsView from './components/EmailsView';
import CalendarPlaceholder from './components/CalendarPlaceholder';
import SummaryPlaceholder from './components/SummaryPlaceholder';
// removed UrgencyPlaceholder and InboxPlaceholder for unified view
import ChatPlaceholder from './components/ChatPlaceholder';
import './styles/styles.css';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />, 
      children: [
        {
          index: true,
          element: <Navigate to="emails" replace />, // Redirect root to emails
        },
        {
          path: "emails",
          element: <EmailsView />, 
        },
        {
          path: "calendar",
          element: <CalendarPlaceholder />, 
        },
        {
          path: "summary",
          element: <SummaryPlaceholder />, 
        },
        {
          path: "chat",
          element: <ChatPlaceholder />, 
        },
      ],
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);