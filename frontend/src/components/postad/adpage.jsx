"use client";
import "./PostAd.css"
import React from 'react'

import  ProfileCard from "./Profilecard"
import styled from 'styled-components';
import AdForm from "./adform";


export default function PostAd() {
  return (
    <>
      
          <PageWrapper>
          <ProfileCard />
          <AdForm />
          </PageWrapper>
      </>
  );
}
const PageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 6px 0px;
  background: #ffffff;
  margin:100px auto;
`;






