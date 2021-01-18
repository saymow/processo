import React from "react";
import Header from "../Header";

import { Container, Content } from "./styles";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header></Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
