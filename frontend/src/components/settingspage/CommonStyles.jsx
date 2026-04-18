import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 0 20px;
  height: 50px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  /* Primary Button */
  &.primary {
    background-color: #0af;
    color: #fff;

    &:hover {
      background-color: #0094d8; /* Slightly darker blue on hover */
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Adding shadow for hover effect */
    }
  }

  /* Secondary Button */
  &.secondary {
    background-color: #e8f7ff;
    color: #0af;

    &:hover {
      background-color: #d1efff; /* Light blue on hover */
      color: #0056b3; /* Darker blue text */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adding shadow for hover effect */
    }
  }

  /* Danger Button */
  &.danger {
    background-color: #ffe5e5;
    color: #ff4f4f;

    &:hover {
      background-color: #ffcccc; /* Light red on hover */
      color: #e60000; /* Darker red text */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Adding shadow for hover effect */
    }
  }
`;

export const FormSection = styled.section`
  display: flex;
  gap: 18px;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div`
  flex: 1;
  min-width: ${(props) => (props.fullWidth ? "100%" : "316px")};
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 991px) {
    min-width: 100%;
  }
`;

export const FormLabel = styled.label`
  color: #191f33;
  font-size: 14px;
  line-height: 26px;
  text-align: left;
`;

export const FormInput = styled.input`
  padding: 12px 18px;
  border: 1px solid #edeff5;
  border-radius: 5px;
  font-size: 16px;
  color: #939aad;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const SectionTitle = styled.h2`
  color: #191f33;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;

  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  margin: 32px 0;
  background-color: #ebeef7;
  border: none;
`;

export const Container = styled.main`
  max-width: 984px;
  margin: 0 auto;
  font-family: "Nunito", sans-serif;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px auto; /* Centers the card horizontally */
  width: 90%;
  max-width: 800px; /* Limit width on larger screens */
`;
export const FormSelect = styled.select`
  padding: 12px 18px;
  border: 1px solid #edeff5;
  border-radius: 5px;
  font-size: 16px;
  color: #939aad;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 640px) {
    font-size: 14px;
  }

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
