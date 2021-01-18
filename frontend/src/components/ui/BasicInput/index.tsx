import React, { InputHTMLAttributes } from "react";

import { Container, Input } from "./styles";

const BasicInput: React.FC<InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <Container>
      <Input {...props} />
    </Container>
  );
};

export default BasicInput;
