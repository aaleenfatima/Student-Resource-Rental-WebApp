import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserCard from './ownercard';
import OverviewCard from './overviewcard';
import AdDetails from './centercomponent';

const ProductPage = () => {
  const { adId } = useParams();
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAdDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/ad/${adId}`);
        if (!response.ok) throw new Error('Failed to fetch ad details');
        const data = await response.json();
        
        if (!data.success || !data.adDetails) {
          throw new Error('Invalid ad data received');
        }

        const adDetails = data.adDetails;
        
        const imageUrls = Array.isArray(adDetails.images) && adDetails.images.length > 0
          ? adDetails.images.map(img => img.url || '/placeholder-image.jpg')
          : ['/placeholder-image.jpg'];

        setAdData({
          title: adDetails.Title || 'No title available',
          images: imageUrls,
          description: adDetails.Description || 'No description provided',
          specialInstructions: adDetails.Special_Instructions || 'No special instructions',
          adType: adDetails.Tag || 'Unknown',
          price: adDetails.Price != null ? adDetails.Price : 0,
          ownerName: adDetails.OwnerName || 'Unknown owner',
          ownerRollNo: adDetails.ownerRollNoRollNo || '', // Added ownerRollNo
          email: adDetails.Email || '',
          ratingValue: adDetails.Rating != null ? adDetails.Rating : 3,
          ratingLabel: getRatingLabel(adDetails.Tag),
          memberSince: adDetails.MemberSince ? new Date(adDetails.MemberSince).toLocaleDateString() : 'Unknown'
        });
      } catch (err) {
        setError(err.message);
        setAdData({
          title: 'Error loading ad',
          images: ['/placeholder-image.jpg'],
          description: 'Could not load ad details',
          specialInstructions: '',
          adType: 'Error',
          price: 0,
          ownerName: '',
          ownerRollNo: '',
          email: '',
          ratingValue: 0,
          ratingLabel: 'Error',
          memberSince: 'Unknown'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdDetails();
  }, [adId]);

  const handleRequest = async () => {
    setIsSubmitting(true);
    try {
      // Get current user's RollNo
      const userResponse = await fetch('http://localhost:5000/userprofile', {
        credentials: 'include'
      });
      const userData = await userResponse.json();
      
      if (!userData.success || !userData.rollNo) {
        throw new Error('Please login to send requests');
      }

      // Prepare request data
      const requestData = {
        RollNo2: userData.rollNo,
        ad_id: adId
      };

      // Send request to backend
      const response = await fetch('http://localhost:5000/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestData)
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'Failed to send request');
      }

      setPopupMessage('Request sent successfully! Email notification sent to owner.');
      setShowPopup(true);
    } catch (err) {
      setPopupMessage(err.message || 'Error sending request');
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRatingLabel = (adType) => {
    switch (adType) {
      case 'Skill': return 'Expertise Level';
      case 'Product': return 'Condition';
      case 'Request': return 'Urgency';
      default: return 'Rating';
    }
  };

  if (loading) return <LoadingMessage>Loading product details...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <PageWrapper>
      <AdDetails
        title={adData.title}
        images={adData.images}
        description={adData.description}
        specialInstructions={adData.specialInstructions}
        adType={adData.adType}
        price={adData.price}
      />
      
      <SideSection>
        <UserCard
          name={adData.ownerName}
          email={adData.email}
          memberSince={adData.memberSince}
        />
        
        <OverviewCard
          ratingLabel={adData.ratingLabel}
          ratingValue={adData.ratingValue}
          adType={adData.adType}
        />

        <RequestButton 
          onClick={handleRequest}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Request Item'}
        </RequestButton>

        {showPopup && (
          <Popup>
            <PopupContent>
              <p>{popupMessage}</p>
              <CloseButton onClick={() => setShowPopup(false)}>
                Close
              </CloseButton>
            </PopupContent>
          </Popup>
        )}
      </SideSection>
    </PageWrapper>
  );
};

// Styled components
const LoadingMessage = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #cc0000;
`;

const PageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SideSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: sticky;
  top: 1rem;
  height: fit-content;
`;

const RequestButton = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default ProductPage;