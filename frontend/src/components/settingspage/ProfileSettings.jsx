"use client";
import React, { useState } from "react";
import { Container, Divider, Card } from "./CommonStyles";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import PasswordSection from "./PasswordSection";
import DeleteAccount from "./DeleteAccount";
import ProfileCard from "../postad/Profilecard";


export default function ProfileSettings() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <div style={{ display: "flex", padding: "80px", backgroundColor: "#fff" }}>
        <ProfileCard />
        <Container style={{ flex: 1 }}>
          <Card>
            <AccountInfo onImageSelect={handleImageSelect} previewUrl={previewUrl} />
            <PersonalInfo selectedImage={selectedImage} />
            <Divider />
            <PasswordSection />
            <Divider />
            <DeleteAccount />
          </Card>
        </Container>
      </div>
    </>
  );
}
