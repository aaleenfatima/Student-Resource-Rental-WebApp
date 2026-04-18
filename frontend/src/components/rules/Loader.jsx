import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader">
      <span style={{
        color: 'white',
        fontSize: '1.2rem',
        textShadow: '0 0 5px #fff, 0 0 10px #f0f, 0 0 20px #0ff'
      }}>
        
        
        
        
        Welcome to Unishare!</span>
      
      <div>
        <ul>
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index}>
              <svg fill="currentColor" viewBox="0 0 90 120">
                <path d="M90,0 L90,120 L11,120 C4.92,120 0,115.07 0,109 L0,11 C0,4.92 4.92,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.12,81 16,82.12 16,83.5 C16,84.83 17.03,85.91 18.33,85.99 L18.5,86 L71.5,86 C72.88,86 74,84.88 74,83.5 C74,82.17 72.96,81.08 71.66,81.00 L71.5,81 Z M71.5,57 L18.5,57 C17.12,57 16,58.12 16,59.5 C16,60.83 17.03,61.91 18.33,61.99 L18.5,62 L71.5,62 C72.88,62 74,60.88 74,59.5 C74,58.12 72.88,57 71.5,57 Z M71.5,33 L18.5,33 C17.12,33 16,34.12 16,35.5 C16,36.83 17.03,37.91 18.33,37.99 L18.5,38 L71.5,38 C72.88,38 74,36.88 74,35.5 C74,34.12 72.88,33 71.5,33 Z" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    
      
    </div>
  );
};

export default Loader;
