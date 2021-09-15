import styled from "styled-components";

export const SinglePasswordInput = styled.input`
  width: 45px;
  height: 65px;
  border: 1px solid #000;
  text-align: center;
  font-size: 35px;
  margin: 5px;

  &:disabled {
    background-color: lightgrey;
    border: none;
    height: 67px;
  }
`;
