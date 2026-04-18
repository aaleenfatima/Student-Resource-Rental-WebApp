"use client";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  FormSection,
  FormGroup,
  FormLabel,
  FormInput,
  StyledButton,
  FormSelect,
} from "./CommonStyles";

const PhoneInputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #edeff5;
  border-radius: 5px;
  background-color: #fff;
`;

const PhoneInput = styled(FormInput)`
  border: none;
  padding: 12px;
  flex: 1;
`;

export default function PersonalInfo({ selectedImage }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const bloodGroupRef = useRef();
  const ageRef = useRef();
  const emailRef = useRef();

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    if (nameRef.current?.value) formData.append("NewName", nameRef.current.value);
    if (phoneRef.current?.value) formData.append("NewContact", phoneRef.current.value);
    if (addressRef.current?.value) formData.append("NewAddress", addressRef.current.value);
    if (bloodGroupRef.current?.value) formData.append("NewBloodgroup", bloodGroupRef.current.value);
    if (ageRef.current?.value) formData.append("NewAge", ageRef.current.value);
    if (emailRef.current?.value) formData.append("NewEmail", emailRef.current.value);
    
    if (selectedImage) {
      formData.append("NewPhoto", selectedImage);
    }

    try {
      const res = await fetch("http://localhost:5000/update-profile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.message || "Update failed");
      }

      if (result.success) {
        alert("Profile updated successfully ✅");
        // Optionally refresh user data here
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
      alert(`Update failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleInfoSubmit}>
      <FormSection>
        <FormGroup fullWidth>
          <FormLabel htmlFor="fullName">Full Name</FormLabel>
          <FormInput ref={nameRef} id="fullName" type="text" placeholder="Full name" />
        </FormGroup>

        <FormGroup fullWidth>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <PhoneInputWrapper>
            <PhoneInput 
              ref={phoneRef} 
              id="phone" 
              type="tel" 
              placeholder="Phone" 
              pattern="[0-9]{11}"
              title="Please enter 11 digits phone number"
            />
          </PhoneInputWrapper>
        </FormGroup>
      </FormSection>

      <FormSection>
        <FormGroup fullWidth>
          <FormLabel htmlFor="address">Address</FormLabel>
          <FormInput ref={addressRef} id="address" type="text" placeholder="Enter address" />
        </FormGroup>
      </FormSection>

      <FormSection>
        <FormGroup>
          <FormLabel htmlFor="bloodGroup">Blood group</FormLabel>
          <FormSelect ref={bloodGroupRef} name="bloodGroup" id="bloodGroup">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="Age">Age</FormLabel>
          <FormInput 
            ref={ageRef} 
            id="Age" 
            type="number" 
            placeholder="Age" 
            min="16"
            max="100"
          />
        </FormGroup>
      </FormSection>

      <FormSection>
        <FormGroup fullWidth>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput 
            ref={emailRef} 
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            title="Please enter a valid email address"
          />
        </FormGroup>
      </FormSection>

      {error && <div style={{ color: "red", marginBottom: "16px" }}>{error}</div>}

      <StyledButton 
        type="submit" 
        className="primary" 
        style={{ marginTop: "16px" }}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </StyledButton>
    </form>
  );
}