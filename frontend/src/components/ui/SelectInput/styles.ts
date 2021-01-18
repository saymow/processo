import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Label = styled.label`
  font-size: 1.2rem;
`;

export const InputSelect = styled.select`
  width: 100%;
  font-size: 1rem;
  padding: 0.8rem 0.5rem;
`;

export const InputOptions = styled.option`
  width: 100%;
  font-size: 1rem;
  padding: 0.8rem 0.5rem;
`;

export const InputError = styled.span`
  position: absolute;
  bottom: calc(-0.8rem - (2 * (0.2rem + 1px)));

  font-size: 0.8rem;
  line-height: 0.8rem;

  padding: 0.2rem;
  border: 1px solid rgb(255, 0, 0);
  background: rgba(255, 0, 0, 0.1);
`;
