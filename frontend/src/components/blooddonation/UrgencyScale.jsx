// src/components/UrgencyScale.jsx
const UrgencyScale = ({ level = 3 }) => {
    // Ensure level stays within 1-5 range
    const normalizedLevel = Math.min(Math.max(level, 1), 5);
  
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Urgency:</span>
        {[...Array(normalizedLevel)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: '1.5rem',
              color: '#d00000',
              transition: 'color 0.2s ease'
            }}
          >
            ⚠️
          </span>
        ))}
      </div>
    );
  };
  
  export default UrgencyScale;