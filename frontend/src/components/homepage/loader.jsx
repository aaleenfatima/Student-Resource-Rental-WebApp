import React from 'react';
import './loader.css'; // Make sure you include your CSS here

const Loader = () => {
  return (
    <aside className="container-loader">
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="aro" style={{ '--s': i }}></div>
      ))}
    </aside>
  );
};

export default Loader;
