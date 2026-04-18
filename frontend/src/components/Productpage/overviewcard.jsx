import React from 'react';
import styled from 'styled-components';
import RatingStars from './stars';

const OverviewCard = ({ ratingLabel, ratingValue, deadline }) => {
  return (
    <Card>
      <Title>Overview</Title>
      <Row>
        <Label>{ratingLabel}:</Label>
        <Value><RatingStars value={ratingValue} /></Value>
      </Row>
      <Row>
        <Label>Deadline:</Label>
        <Value muted>{deadline}</Value>
      </Row>
      <Divider />
    </Card>
  );
};
export default OverviewCard;

const Card = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    padding: 20px;
    max-width: 300px;
    background: '#ffffff',
    boxshadow: '0 20px 15px rgba(0, 0, 0, 0.1)'
`;

const Title = styled.h3`
    margin: 0 0 16px 0;
    font-size: 18px;
    color: #1c1c1e;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

const Label = styled.div`
    font-size: 14px;
    color: #333;
`;

const Value = styled.div`
    font-size: 14px;
    color: ${({ muted }) => (muted ? '#ccc' : '#333')};
    display: flex;
    align-items: center;
`;

const Divider = styled.div`
    border-top: 1px solid #f1f1f1;
    margin-top: 10px;
`;
