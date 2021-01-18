import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 60rem;
  margin: auto;
`;

export const ArrowContainer = styled.div`
  cursor: pointer;

  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export const InputBlocker = styled.div``;

export const Form = styled.form`
  display: grid;
  grid-gap: 1rem;
  grid-template-areas: "a1 a2" "a3 a3";
`;

export const FormSpliter = styled.div`
  &:first-child {
    grid-area: a1;

    button {
      margin-top: 3.2rem;
    }
  }
  &:nth-child(2) {
    grid-area: a2;
  }
  &:last-child {
    grid-area: a3;
  }
`;
