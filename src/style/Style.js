import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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