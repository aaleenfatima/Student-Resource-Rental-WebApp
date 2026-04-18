// adcard.jsx
import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Add this

const AdCard = ({ imageSrc, title, category, price, adType, adId }) => { // Add adId prop
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/ad/${adId}`); // Navigate to ad detail page
  };

  return (
    <CardWrapper onClick={handleCardClick}> {/* Add click handler */}
      <ImageWrapper>
        <AdImage src={imageSrc} alt={title} />
        {adType && <AdTypeTag adType={adType}>{adType}</AdTypeTag>}
      </ImageWrapper>
      <AdDetails>
        <AdTitle>{title}</AdTitle>
        <AdCategory>{category}</AdCategory>
        <AdPrice>{price}</AdPrice>
      </AdDetails>
    </CardWrapper>
  );
};

// Styled components
const CardWrapper = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  position: relative;
`;

const AdImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AdTypeTag = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background-color: ${props => {
    if (props.adType === 'Skill') return '#4CAF50';
    if (props.adType === 'Product') return '#2196F3';
    if (props.adType === 'Request') return '#FF9800';
    return '#666';
  }};
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const AdDetails = styled.div`
  padding: 15px;
`;

const AdTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #191f33;
  margin-bottom: 8px;
`;

const AdCategory = styled.p`
  font-size: 14px;
  color: #767e94;
  margin-bottom: 6px;
`;

const AdPrice = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #0af;
`;

export default AdCard;