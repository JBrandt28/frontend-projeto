import styled from "styled-components";

export const Container = styled.div`
  height: 97vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // justify-content: space-between;
  background-color: ${({ theme }) => theme.background};
`;

export const Switch = styled.button`
  width: 90px;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  position: fixed;
 top: 20px;
 left:20px;
`;