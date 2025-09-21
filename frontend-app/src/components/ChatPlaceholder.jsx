import React from 'react';
import '../styles/styles.css';

// TODO: Integrate with a chatbot/LLM API on the backend.
const mockChat = [
  { from: 'bot', text: 'Hello! How can I help you with your inbox today?' },
  { from: 'user', text: 'What are the most urgent emails from today?' },
  { from: 'bot', text: "You have two urgent emails: one from 'Client Support' regarding an API key and another from 'John Doe' about the Project Phoenix proposal." },
];

function ChatPlaceholder() {
  return (
    <div className="placeholder-card">
      <h2>Chat with Inbox</h2>
      <p>Ask questions about your emails and get instant answers from our AI assistant.</p>
      <div className="chat-window">
        <div className="chat-messages">
          {mockChat.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.from}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input type="text" placeholder="Type your question..." />
        </div>
      </div>
    </div>
  );
}

export default ChatPlaceholder;