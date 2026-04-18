"use client";
import React from "react";
import styled from "styled-components";
import { StyledButton } from "./CommonStyles";

const DeleteSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const DeleteInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DeleteDescription = styled.p`
  color: #767e94;
  font-size: 16px;
  line-height: 24px;
  max-width: 648px;
  text-align:center;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export default function DeleteAccount() {
  return (
    <DeleteSection>
      <DeleteInfo>
        <h2 className="section-title">Delete Account</h2>
        <DeleteDescription>
        Deleting your account will permanently remove all your data and ads. Unishare is not responsible for any loss resulting from this action.
        </DeleteDescription>
      </DeleteInfo>

      <StyledButton className="danger">
        <div
          dangerouslySetInnerHTML={{
            __html:
              '<svg id="2401:68843" layer-name="Trash" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="trash-icon" style="width: 24px; height: 24px"> <path d="M20.25 5.25L3.75 5.25001" stroke="#FF4F4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.75 9.75V15.75" stroke="#FF4F4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.25 9.75V15.75" stroke="#FF4F4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M18.75 5.25V19.5C18.75 19.6989 18.671 19.8897 18.5303 20.0303C18.3897 20.171 18.1989 20.25 18 20.25H6C5.80109 20.25 5.61032 20.171 5.46967 20.0303C5.32902 19.8897 5.25 19.6989 5.25 19.5V5.25" stroke="#FF4F4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.75 5.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H9.75C9.35218 2.25 8.97064 2.40804 8.68934 2.68934C8.40804 2.97064 8.25 3.35218 8.25 3.75V5.25" stroke="#FF4F4F" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path> </svg>',
          }}
        />
        <span>Delete Account</span>
      </StyledButton>
    </DeleteSection>
  );
}
