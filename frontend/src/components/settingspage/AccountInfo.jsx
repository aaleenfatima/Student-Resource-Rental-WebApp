"use client";
import React, { useRef } from "react";
import styled from "styled-components";
import { StyledButton, FormGroup, FormLabel } from "./CommonStyles";

const AccountInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const EmailInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const EmailLabel = styled.span`
  color: #191f33;
  font-weight: 700;
  font-size: 16px;
`;

const EmailValue = styled.span`
  color: #464d61;
  font-size: 16px;
`;

export default function AccountInfo({ onImageSelect, previewUrl }) {
  const fileInputRef = useRef();

  const handleChooseImage = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <AccountInfoSection>
      <h1 className="section-title">Account Information</h1>
      <ProfileHeader>
        <AvatarSection>
          <Avatar
            src={previewUrl || "https://cdn.builder.io/api/v1/image/assets/TEMP/e1c50c6f83dfd1e363df6a825a804544a120da0a"}
            alt="Profile"
          />
          <StyledButton type="button" onClick={handleChooseImage} className="secondary">
            Choose image
          </StyledButton>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </AvatarSection>
        <EmailInfo>
          <EmailLabel>Email:</EmailLabel>
          <EmailValue>jenny.wilson@gmail.com</EmailValue>
        </EmailInfo>
      </ProfileHeader>
    </AccountInfoSection>
  );
}
