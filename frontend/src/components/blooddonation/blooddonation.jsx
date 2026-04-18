import { useState, useEffect } from 'react';
import UrgencyScale from './UrgencyScale';
import { useNavigate } from 'react-router-dom';

const BloodDonationsPage = () => {
  const [bloodRecords, setBloodRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState({});
  const navigate = useNavigate();

  const handleRequestBlood = () => {
    navigate('/request-blood');
  };

  // Function to fetch contact for a specific record
  const fetchContact = async (rollNo) => {
    try {
      const response = await fetch('http://localhost:5000/user-contact');
      if (!response.ok) throw new Error('Failed to fetch contact');
      const data = await response.json();
      if (data.success) {
        setContacts((prevContacts) => ({
          ...prevContacts,
          [rollNo]: data.contact
        }));
      } else {
        console.error('Failed to fetch contact for RollNo', rollNo);
      }
    } catch (err) {
      console.error("❌ Error fetching contact:", err);
    }
  };

  useEffect(() => {
    const fetchBloodRecords = async () => {
      try {
        const response = await fetch('http://localhost:5000/blood-record');
        if (!response.ok) throw new Error('Failed to fetch blood records');
        const data = await response.json();
        setBloodRecords(data);

        // Fetch contact for each blood record
        data.forEach((record) => {
          fetchContact(record.RollNo);
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBloodRecords();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Blood Donation Requests</h1>
      <button
        onClick={handleRequestBlood}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(to right, #ff4d4d, #cc0000)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 6px 15px rgba(255, 0, 0, 0.3)',
          transition: '0.3s ease'
        }}
      >
        Request Blood
      </button>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {bloodRecords.map((record, index) => (
          <div key={index} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><strong>Blood Group:</strong> {record.BloodType}</li>
              <li><strong>Location:</strong> {record.Hospital}</li>
              <li><strong>Urgency:</strong></li>
            </ul>
            <UrgencyScale level={record.Urgency} />
            <div style={{ marginTop: '1rem' }}>
              <strong>Deadline:</strong> {new Date(record.Deadline).toLocaleDateString()}
            </div>
            <div style={{ marginTop: '1rem' }}>
            <strong>Contact:</strong> {contacts[record.RollNo] || '03344184333'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodDonationsPage;
