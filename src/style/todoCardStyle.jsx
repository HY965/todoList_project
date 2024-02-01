import styled from "styled-components";

export const TextContent = styled.div`
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
`;

export const ListsArr = styled.div`
  width: 300px;
  padding: 1.2rem;
  margin: 5px;
  border: 3px solid #0063e5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

export const CompleteBtn = styled.button`
  margin: 40px 0 0 0px;
  cursor: pointer;
  background-color: #0072d2;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 0.6rem 2rem;
  &:hover {
    background-color: #0682f0;
    transition: all 0.2s ease 0s;
  }
`;

export const DeleteBtn = styled.button`
  margin: 40px 0 0 0px;
  cursor: pointer;
  background-color: #e83828;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  padding: 0.6rem 2rem;
  &:hover {
    background-color: #ff0000;
    transition: all 0.2s ease 0s;
  }
`;

export const BtnSet = styled.div`
  display: flex;
  justify-content: space-around;
`;
