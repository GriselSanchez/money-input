import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
`;

export const StyledMoneyInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  box-sizing: border-box;
  border: ${(props) =>
    `1px solid ${props.$error ? "#EA333D" : "rgba(0,0,0,0.35)"}`};
  border-radius: 8px;
  box-shadow: 1px 1px 5px 1px rgb(0 0 0 / 10%);
  padding: 0.5rem;
  :focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.75);
  }
`;

export const ErrorText = styled.p`
  font-size: 0.8rem;
  color: #ea333d;
  margin: 0;
`;
