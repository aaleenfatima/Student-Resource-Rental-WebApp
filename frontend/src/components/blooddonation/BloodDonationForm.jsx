import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(255, 0, 0, 0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #cc0000;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ffb3b3;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #ffb3b3;
`;

const Button = styled.button`
  width: 100%;
  background: #cc0000;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #990000;
  }
`;

const BloodRequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donationDate: '',
    bloodGroup: '',
    location: '',
    units: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/Request-Blood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Add this
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Submission failed');
      alert('Blood request submitted successfully!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
    navigate('/blooddonation');

  };

  return (
    <FormWrapper>
      <h2 style={{ textAlign: 'center', color: '#cc0000' }}>Blood Request Form</h2>
      <form onSubmit={handleSubmit}>
        
        <Label>Date Needed</Label>
        <Input type="date" name="donationDate" value={formData.donationDate} onChange={handleChange} required />

        <Label>Blood Group</Label>
        <Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
          <option value="">Select</option>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
            <option key={group} value={group}>{group}</option>
          ))}
        </Select>

        <Label>Hospital / Location</Label>
        <Input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <Label>Urgency</Label>
        <Input type="number" name="units" value={formData.units} onChange={handleChange} required />

        <Button type="submit">Submit Request</Button>
      </form>
    </FormWrapper>
  );
};

export default BloodRequestForm;
