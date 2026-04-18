import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const SlideContainer = styled(motion.div)`
  max-width: 800px;
  margin: 100px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 50, 0.1);
`;

const Heading = styled.h2`
  text-align: center;
  color: #002b80;
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Segoe UI', sans-serif;
`;

const Th = styled.th`
  background: #002b80;
  color: white;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const UniShareGuidelines = () => {
  return (
    <SlideContainer
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <Heading>📘 UniShare Community Guidelines</Heading>
      <StyledTable>
        <thead>
          <tr>
            <Th>Rule</Th>
            <Th>Description</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>Care for Lent Items</Td>
            <Td>Free items must not be sold or monetized for profit.</Td>
          </tr>
          <tr>
            <Td>Respect Privacy</Td>
            <Td>Never share another user's personal info without permission.</Td>
          </tr>
          <tr>
            <Td>Be Honest</Td>
            <Td>Describe all items accurately and truthfully in listings.</Td>
          </tr>
          <tr>
            <Td>Meet Safely</Td>
            <Td>Always meet in public or on-campus areas during exchanges.</Td>
          </tr>
          <tr>
            <Td>Report Abuse</Td>
            <Td>Report any suspicious or abusive behavior to UniShare admins.</Td>
          </tr>
          <tr>
            <Td>Respect Timelines</Td>
            <Td>Honor agreed pickup times or notify the other party in advance.</Td>
          </tr>
        </tbody>
      </StyledTable>
    </SlideContainer>
  );
};

export default UniShareGuidelines;
