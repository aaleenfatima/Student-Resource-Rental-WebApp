import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import axios from 'axios';

const AdForm = () => {
  const [tag, setTag] = useState('');
  const [mode, setMode] = useState('');
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    color: '',
    tag: '',
    levelOrConditionOrUrgency: '',
    mode: '',
    description: '',
    specialInstructions: '',
    price: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formPayload = new FormData();

      // Add form data
      formPayload.append('category', formData.category);
      formPayload.append('tag', formData.tag);
      formPayload.append('date', new Date().toISOString().split('T')[0]);
      formPayload.append('SI', formData.specialInstructions);

      // Add details based on tag
      const details = {};
      switch (formData.tag) {
        case 'Skill':
          details.SkillName = formData.title;
          details.Description = formData.description;
          details.Availability = formData.mode;
          details.price = formData.price;
          details.Level = formData.levelOrConditionOrUrgency;
          break;
        case 'Product Ad':
          details.name = formData.title;
          details.description = formData.description;
          details.color = formData.color;
          details.condition = formData.levelOrConditionOrUrgency;
          details.availability = formData.mode;
          details.price = formData.price;
          break;
        case 'Request Ad':
          details.item = formData.title;
          details.description = formData.description;
          details.color = formData.color;
          details.condition = formData.levelOrConditionOrUrgency;
          details.availability = formData.mode;
          details.urgency = formData.levelOrConditionOrUrgency;
          break;
        default:
          throw new Error('Invalid ad type selected');
      }

      formPayload.append('details', JSON.stringify(details));

      // Add images
      images.forEach((image) => {
        formPayload.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/ads', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data.success) {
        alert('Ad posted successfully!');
        // Reset form
        setFormData({
          title: '',
          category: '',
          color: '',
          tag: '',
          levelOrConditionOrUrgency: '',
          mode: '',
          description: '',
          specialInstructions: '',
          price: '',
        });
        setImages([]);
      } else {
        throw new Error(response.data.message || 'Failed to post ad');
      }
    } catch (err) {
      console.error('Ad submission error:', err);
      setError(err.message || 'Failed to post ad. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 5) {
      alert('You can upload a maximum of 5 images');
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const conditionalLabel = {
    'Skill': 'Expertise Level',
    'Product Ad': 'Condition',
    'Request Ad': 'Urgency',
  };

  const isPriceDisabled = mode === 'Borrow';

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <FormRow>
        <FormGroup flex={1}>
          <label>Ad Title</label>
          <input 
            type="text" 
            placeholder="Enter ad title" 
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </FormGroup>
        <FormGroup flex={1}>
          <label>Colour</label>
          <input 
            type="text" 
            placeholder="e.g. Blue, Red" 
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup flex={1}>
          <label>Category</label>
          <select 
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          >
            <option value="">Select...</option>
            <option>Skill</option>
            <option>Stationary</option>
            <option>Notes/Resources</option>
            <option>Electronics</option>
            <option>Clothes</option>
            <option>Others</option>
          </select>
        </FormGroup>

        <FormGroup flex={1}>
          <label>Tag</label>
          <select 
            value={formData.tag}
            onChange={(e) => {
              const selectedTag = e.target.value;
              setTag(selectedTag);
              setFormData({ ...formData, tag: selectedTag });
            }}
            required
          >
            <option value="">Select...</option>
            <option>Skill</option>
            <option>Product Ad</option>
            <option>Request Ad</option>
          </select>
        </FormGroup>
      </FormRow>

      {tag && (
        <FormGroup>
          <label>{conditionalLabel[tag]}</label>
          <select 
            value={formData.levelOrConditionOrUrgency}
            onChange={(e) => setFormData({ ...formData, levelOrConditionOrUrgency: e.target.value })}
            required
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </FormGroup>
      )}

      <FormGroup>
        <label>Exchange Option</label>
        <RadioGroup>
          <label>
            <input
              type="radio"
              name="mode"
              value="Borrow"
              checked={formData.mode === 'Borrow'}
              onChange={(e) => {
                setMode(e.target.value);
                setFormData({ ...formData, mode: e.target.value });
              }}
            /> Borrow
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="Rent"
              checked={formData.mode === 'Rent'}
              onChange={(e) => {
                setMode(e.target.value);
                setFormData({ ...formData, mode: e.target.value });
              }}
            /> Rent
          </label>
        </RadioGroup>
      </FormGroup>

      <FormGroup>
        <label>Description</label>
        <textarea 
          rows="3" 
          placeholder="Enter ad description..."  
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Special Instructions</label>
        <textarea 
          rows="2" 
          placeholder="Add any special note..." 
          value={formData.specialInstructions}
          onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
        />
      </FormGroup>

      <FormGroup>
        <label>Price</label>
        <input 
          type="number" 
          placeholder="e.g. 2000" 
          disabled={isPriceDisabled} 
          value={formData.price}  
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required={!isPriceDisabled}
        />
      </FormGroup>

      <FormGroup>
        <label>Upload Images (Max 5)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
          multiple
        />
              {error && <ErrorMessage>{error}</ErrorMessage>}

        <ImagesPreview>
          {images.map((image, index) => (
            <ImagePreview key={index}>
              <img src={URL.createObjectURL(image)} alt={`preview-${index}`} />
              <button type="button" onClick={() => removeImage(index)}>
                Remove
              </button>
            </ImagePreview>
          ))}
        </ImagesPreview>
      </FormGroup>

      <ButtonRow>
      <Link to="/rules" >View Posting Rules  </Link>
        <BlueButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publishing...' : 'Publish Ad'}
        </BlueButton>
      </ButtonRow>
    </FormWrapper>
  );
};

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  background-color: #fff5f5;
`;
const ImagesPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

export default AdForm;
const FormWrapper = styled.form`
  background: #fff;
  padding: 40px;
  border-radius: 30px;
  min-width: 800px;
  margin: auto;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: 'Segoe UI', sans-serif;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
`;

const FormGroup = styled.div`
  flex: ${({ flex }) => flex || '1'};
  display: flex;
  flex-direction: column;

  label {
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
  }

  input, select, textarea {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    transition: border 0.3s;
  }

  input:focus, select:focus, textarea:focus {
    border-color: #007bff;
    outline: none;
  }

  textarea {
    resize: vertical;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 6px;

  label {
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #ddd;
  }

  button {
    background-color: #ff4f4f;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background-color: #e04343;
    }
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const WhiteButton = styled.button`
  background: white;
  color: #333;
  border: 1px solid #ccc;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

const BlueButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;
