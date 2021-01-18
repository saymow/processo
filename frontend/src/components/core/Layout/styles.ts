import styled from "styled-components";
import { CONTAINER_WIDTH, HEADER_HEIGHT } from "../../../constants";

export const Container = styled.div``;

export const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: ${CONTAINER_WIDTH};
  margin: ${HEADER_HEIGHT} auto 0 auto;
  padding: 2rem;
`;
