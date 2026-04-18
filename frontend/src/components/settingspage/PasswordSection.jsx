"use client";
import React, { useRef } from "react";
import styled from "styled-components";
import {
  FormSection,
  FormGroup,
  FormLabel,
  StyledButton,
} from "./CommonStyles";

const PasswordInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  input {
    width: 100%;
    padding: 12px 18px;
    border: 1px solid #edeff5;
    border-radius: 5px;
    font-size: 16px;
    color: #939aad;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 16px;
  cursor: pointer;
`;

export default function PasswordSection() {
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match ⚠️");
      return;
    }

    const formData = new FormData();
    formData.append("NewPassword", newPassword);
    formData.append("NewName", null);
    formData.append("NewContact", null);
    formData.append("NewAddress", null);
    formData.append("NewBloodgroup", null);
    formData.append("Newage", null);
    formData.append("NewEmail", null);

    try {
      const response = await fetch("/update-profile", {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        alert("Password updated ✅");
      } else {
        alert("Failed to update password ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Error while updating password");
    }
  };

  return (
    <section>
      <h2 className="section-title">Change Password</h2>
      <form onSubmit={handlePasswordSubmit}>
        <FormSection>
          <FormGroup>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <PasswordInput>
              <input ref={newPasswordRef} type="password" id="newPassword" placeholder="Password" />
              <EyeIcon dangerouslySetInnerHTML={{ __html: '<svg ... />' }} />
            </PasswordInput>
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <PasswordInput>
              <input ref={confirmPasswordRef} type="password" id="confirmPassword" placeholder="Password" />
              <EyeIcon dangerouslySetInnerHTML={{ __html: '<svg ... />' }} />
            </PasswordInput>
          </FormGroup>
        </FormSection>

        <StyledButton type="submit" className="primary" style={{ marginTop: "16px" }}>
          Save Changes
        </StyledButton>
      </form>
    </section>
  );
}
