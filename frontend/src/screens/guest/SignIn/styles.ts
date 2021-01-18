import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
`;

export const AsideDecorator = styled.div`
  flex: 1;
  background: var(--accent-Color);
`;

export const AuthContainer = styled.div`
  width: 100%;

  max-width: 40vw;
  min-width: 30rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 60%;

  > button {
    margin-top: 2rem;
  }
`;
