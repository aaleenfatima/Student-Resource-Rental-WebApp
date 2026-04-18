import React, { useState, useEffect } from 'react';
import HomePage from './loader.jsx';  
import video from './home.mp4';
import './home.css'; // Import the CSS for this specific component

function TimedComponent() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      <video className="bg-video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>

      <div className="dark-overlay"></div>

      <div className="overlay-content">
        {isVisible ? (
          <HomePage />
        ) : (
          <div className="slogan-text">
            <h1>
              Welcome to <span className="highlight">UniShare</span>
            </h1>
            <p className="tagline">
              Because <span className="glow">Sharing</span> is <span className="glow">Caring</span> 🌟
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TimedComponent;
