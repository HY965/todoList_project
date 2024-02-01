import styled from "styled-components";

export const HeaderContent = styled.div`
  background-color: #cccc;
  border-radius: 8px;
  display: flex;
  padding: 1.5rem;
`;

export const InputTitle = styled.p`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin: 10px;
`;

export const InputStyle = styled.input`
  border-radius: 5px;
  border: none;
`;

export const AddBtn = styled.button`
  margin-right: 40px;
  background-color: #0072d2;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 0.6rem 2rem;
  cursor: pointer;
  margin: 0 0 0 25rem;
  &:hover {
    background-color: #0682f0;
    transition: all 0.2s ease 0s;
  }
`;

export const CardList = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const SortOrder = styled.select`
  margin: 1rem;
`;

export const NavSet = styled.div`
  display: flex;
`;

export const CardBundle = styled.div`
  margin-top: 3rem;
`;
