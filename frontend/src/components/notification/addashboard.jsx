import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  // Predefined options
  const PLACES = ['Cafeteria', 'Library', 'Main Gate'];
  const TIMES = ['8:30 AM', '1:00 PM', '5:00 PM'];

  const fetchRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/getreqdata', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Failed to fetch requests');
      
      const data = await response.json();
      setReceivedRequests(data.data.recordsets[0] || []);
      setSentRequests(data.data.recordsets[1] || []);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [refreshTrigger]);

  const getSelection = (options, type) => {
    const input = prompt(
      `Choose ${type}:\n${options.map((o, i) => `${i+1}. ${o}`).join('\n')}`,
      options[0]
    );
    
    // Try to parse number input
    const index = parseInt(input) - 1;
    if (!isNaN(index) && index >= 0 && index < options.length) {
      return options[index];
    }
    
    // Check direct text input
    if (options.includes(input)) {
      return input;
    }
    
    return null;
  };

  const handleAcceptReject = async (action, requestId) => {
    let selectedPlace = PLACES[0];
    let selectedTime = TIMES[0];

    if (action === 'Accept') {
      selectedPlace = getSelection(PLACES, 'place');
      if (!selectedPlace) {
        alert('Invalid place selection');
        return;
      }

      selectedTime = getSelection(TIMES, 'time');
      if (!selectedTime) {
        alert('Invalid time selection');
        return;
      }
    }

    setIsProcessing(true);
    try {
      let endpoint, body;
      
      if (action === 'Accept') {
        endpoint = '/accept-request';
        body = {
          RequestID: requestId,
          Approval: 1,
          X: selectedPlace,
          Y: selectedTime
        };
      } else {
        endpoint = '/decline-request';
        body = { RequestID: requestId };
      }

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert(`${action} successful!`);
      setRefreshTrigger(prev => !prev);
      
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={styles.wrapperCard}>
        <h2>Received Requests</h2>
        {receivedRequests.map((request) => (
          <div key={request.RequestID} style={styles.card}>
            <div style={styles.tile}>
              <span style={styles.tileContent}>Request ID: {request.RequestID}</span>
              <span style={styles.tileContent}>Ad ID: {request.AdID}</span>
              <span style={styles.tileContent}>From: {request.RollNo2}</span>
              <span style={styles.tileContent}>Status: {request.State}</span>
            </div>
            {request.State === 'Pending' && (
              <div style={{ display: 'flex' }}>
                <button
                  disabled={isProcessing}
                  onClick={() => handleAcceptReject('Accept', request.RequestID)}
                  style={{ 
                    ...styles.button, 
                    backgroundColor: 'green', 
                    color: 'white',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                >
                  {isProcessing ? 'Processing...' : 'Accept'}
                </button>
                <button
                  disabled={isProcessing}
                  onClick={() => handleAcceptReject('Reject', request.RequestID)}
                  style={{ 
                    ...styles.button, 
                    backgroundColor: 'red', 
                    color: 'white',
                    opacity: isProcessing ? 0.6 : 1
                  }}
                >
                  {isProcessing ? 'Processing...' : 'Reject'}
                </button>
              </div>
            )}
          </div>
        ))}

        <h2>Sent Requests</h2>
        {sentRequests.map((request) => (
          <div key={request.RequestID} style={styles.card}>
            <div style={styles.tile}>
              <span style={styles.tileContent}>Request ID: {request.RequestID}</span>
              <span style={styles.tileContent}>Ad ID: {request.AdID}</span>
              <span style={styles.tileContent}>To: {request.RollNo1}</span>
              <span style={styles.tileContent}>Status: {request.State}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  wrapperCard: {
    border: 'none',
    borderRadius: '20px',
    padding: '30px',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '800px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '20px',
    margin: '20px 0',
    padding: '10px',
    width: '100%',
  },
  tile: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tileContent: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '14px',
    fontWeight: '600',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default Dashboard;