import styled from "styled-components";
import { HEADER_HEIGHT, CONTAINER_WIDTH } from "../../../constants";

export const Container = styled.header`
  height: ${HEADER_HEIGHT};

  position: fixed;
  z-index: 99;
  top: 0;
  right: 0;

  width: 100%;

  background: var(--bg-Color);
  box-shadow: 5px 5px 14px -1px rgba(0, 0, 0, 0.35);
`;

export const HeaderContainer = styled.main`
  position: relative;

  margin: auto;

  width: 100%;
  height: 100%;
  max-width: ${CONTAINER_WIDTH};

  display: flex;
  align-items: center;
  justify-items: space-between;
`;

export const LogoutAction = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;
  color: var(--accent-Color);

  cursor: pointer;

  border-radius: 0.5rem;
  border: 1px solid var(--accent-Color);
  padding: 0.5rem;

  display: flex;
  align-items: center;

  p {
    text-transform: uppercase;
    font-size: 1.2rem;
  }

  svg {
    height: 1.4rem;
    width: 1.4rem;
    margin-right: 0.3rem;
  }
`;
