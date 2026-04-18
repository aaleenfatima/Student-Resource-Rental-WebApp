import React from 'react';
import styled from 'styled-components';

const RatingStars = ({ value }) => {
  return (
    <StarWrapper>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={value >= star ? 'filled' : ''}>★</span>
      ))}
    </StarWrapper>
  );
};

const StarWrapper = styled.div`
  display: inline-flex;
  gap: 2px;

  span {
    font-size: 18px;
    color: #ccc;
    transition: color 0.3s ease;
  }

  .filled {
    color: #6f00ff;
  }
`;

export default RatingStars;
