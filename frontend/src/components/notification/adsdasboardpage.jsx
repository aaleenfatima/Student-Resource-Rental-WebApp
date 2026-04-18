"use client";
import React from 'react'

import  ProfileCard from "../postad/Profilecard"
import styled from 'styled-components';
import Dashboard from './addashboard';


export default function Mydash() {
  return (
    <>
      
          <PageWrapper>
          <ProfileCard />
          <Dashboard />
          </PageWrapper>
      </>
  );
}
const PageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 6px 0px;
  background: #ffffff;
  margin:100px auto;
`;






