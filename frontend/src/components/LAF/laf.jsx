import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LafPage = () => {
  const [lafItems, setLafItems] = useState([]);
  const [contacts, setContacts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLafItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/LAF');
        if (!response.ok) throw new Error('Failed to fetch LAF items');
        const data = await response.json();
        setLafItems(data);

        // Extract unique RollNos
        const rollNos = [...new Set(data.map(item => item.RollNo))];

        // Fetch contact for each RollNo
        const contactMap = {};
        for (let rollNo of rollNos) {
          try {
            const contactRes = await fetch(`http://localhost:5000/user-contact?rollNo=${rollNo}`);
            const contactData = await contactRes.json();
            if (contactData.success) {
              contactMap[rollNo] = contactData.contact;
            }
          } catch (err) {
            console.error(`Failed to fetch contact for RollNo: ${rollNo}`, err);
          }
        }
        setContacts(contactMap);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLafItems();
  }, []);

  const handleViewPicture = (pictureData, mimeType) => {
    if (!pictureData) return;
    const blob = new Blob([new Uint8Array(pictureData.data)], { type: mimeType });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  const handleAddEntry = () => {
    navigate('/lost-and-found-form');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Lost & Found Items</h1>
        <button 
          onClick={handleAddEntry}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(to right, #007bff, #0056b3)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
            transition: '0.3s ease'
          }}
        >
          Add New Entry
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {lafItems.map((item, index) => (
          <div key={index} style={{ border: '1px solid #eee', padding: '1rem', borderRadius: '8px' }}>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><strong>Description:</strong> {item.ItemDescription}</li>
              <li><strong>Location:</strong> {item.Location_Found}</li>
              <li><strong>Roll Number:</strong> {item.RollNo}</li>
              <li><strong>Contact:</strong> {contacts[item.RollNo] || '03210972226'}</li>
            </ul>
            <button
              onClick={() => handleViewPicture(item.Picture, item.Ptype)}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007BFF',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              View Picture
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LafPage;
