import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 123, 255, 0.2), 0 5px 10px rgba(0, 123, 255, 0.1);
  border: 1px solid #cce0ff;
`;

const Title = styled.h2`
  text-align: center;
  color: #0056b3;
  margin-bottom: 30px;
  font-weight: 700;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #004085;
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #cce5ff;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #cce5ff;
  border-radius: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);

  &:focus {
    border-color: #3399ff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(to right, #007bff, #0056b3);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #0056b3, #004080);
    box-shadow: 0 8px 20px rgba(0, 86, 179, 0.4);
  }
`;

const LostAndFoundForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    picture: null,
    itemDescription: '',
    locationFound: '',
    dateLost: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'picture' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add validation for required fields
    if (!formData.picture || !formData.itemDescription || !formData.locationFound || !formData.dateLost) {
      alert('Please fill all required fields');
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('Picture', formData.picture);
    formDataToSend.append('ItemDescription', formData.itemDescription);
    formDataToSend.append('Location_Found', formData.locationFound);
    formDataToSend.append('report_date', formData.dateLost);
  
    try {
      const response = await fetch('http://localhost:5000/laf/report', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include', // Add this
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }
  
      const result = await response.json();
      alert(result.message || 'Report submitted!');
      navigate('/laf');
      
    } catch (error) {
      console.error('Fetch error:', error);
      alert(`Submission failed: ${error.message}`);
    }
  };
  return (
    <FormWrapper>
      <Title>Lost and Found Registration</Title>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Label>Upload Picture:</Label>
        <Input 
          type="file" 
          name="picture" 
          accept="image/*" 
          onChange={handleChange} 
          required 
        />

        <Label>Item Description:</Label>
        <TextArea 
          name="itemDescription" 
          rows="4" 
          value={formData.itemDescription} 
          onChange={handleChange} 
          required 
        />

        <Label>Location Found:</Label>
        <Input 
          type="text" 
          name="locationFound" 
          value={formData.locationFound} 
          onChange={handleChange} 
          required 
        />

        <Label>Date Lost:</Label>
        <Input 
          type="date" 
          name="dateLost" 
          value={formData.dateLost} 
          onChange={handleChange} 
          required 
        />

        <Button type="submit">Submit Report</Button>
      </form>
    </FormWrapper>
  );
};

export default LostAndFoundForm;