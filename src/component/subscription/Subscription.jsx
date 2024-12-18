import React, { useState } from 'react';
import './Subscription.css';

export default function Subscription() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Newsletter subscription submitted with email:', email);
    setEmail('');
  };

  return (
    <div className="subscription-container">
      <div className='subscription-border p'>
        <div className="subscription-wrapper">
          <h2 className="subscription-title">
            Subscribe to Our Newsletter
          </h2>
          <p className="subscription-description">
            Subscribe to our newsletter and stay updated!
          </p>
          <form onSubmit={handleSubmit} className="subscription-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
              className="subscription-input"
              required
            />
            <button
              type="submit"
              className="subscription-button"
            >Subscribe&nbsp;now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
