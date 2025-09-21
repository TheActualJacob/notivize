import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import InboxPlaceholder from './components/InboxPlaceholder';
import CalendarPlaceholder from './components/CalendarPlaceholder';
import SummaryPlaceholder from './components/SummaryPlaceholder';
import UrgencyPlaceholder from './components/UrgencyPlaceholder';
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
          element: <Navigate to="/inbox" replace />, // Redirect root to /inbox
        },
        {
          path: "inbox",
          element: <InboxPlaceholder />, 
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
          path: "urgency",
          element: <UrgencyPlaceholder />, 
        },
        {
          path: "chat",
          element: <ChatPlaceholder />, 
        },
      ],
    },
  ],
  { basename: "/notivize" }
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);