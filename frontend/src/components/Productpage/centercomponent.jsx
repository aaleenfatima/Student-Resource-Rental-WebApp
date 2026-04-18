import React, { useState } from 'react';
import styled from 'styled-components';

const AdDetails = ({ title, images, description, specialInstructions, adType }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Wrapper>
      <Header>
        <TagContainer>
          <TagRed>{adType}</TagRed>
          <TagGreen>Member</TagGreen>
        </TagContainer>
        <Title>{title}</Title>
      </Header>

      <ImageSection>
        <ArrowButton onClick={handlePrev}>&lt;</ArrowButton>
        <MainImage src={images[currentIndex]} alt={`slide-${currentIndex}`} />
        <ArrowButton onClick={handleNext}>&gt;</ArrowButton>
      </ImageSection>

      <Section>
        <SectionTitle>Descriptions</SectionTitle>
        <Text>{description}</Text>
      </Section>

      <Section>
        <SectionTitle>Special Instructions</SectionTitle>
        <Text>{specialInstructions}</Text>
      </Section>
    </Wrapper>
  );
};

export default AdDetails;
const Wrapper = styled.div`
    max-width: 600px;
    margin: 0 auto 0 250px;
    font-family: 'Segoe UI', sans-serif;
    padding: 20px;
`;


const Header = styled.div`
  margin-bottom: 20px;
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
`;

const TagRed = styled.span`
  background: #ff4d4f;
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;

const TagGreen = styled.span`
  background: #52c41a;
  color: #fff;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #1a1a1a;
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
`;

const MainImage = styled.img`
  min-height: 600px;
  max-height: 600px;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: 1px solid #aaa;
  font-size: 20px;
  padding: 6px 12px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const Section = styled.div`
  margin-top: 40px;
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
`;

const Text = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;
