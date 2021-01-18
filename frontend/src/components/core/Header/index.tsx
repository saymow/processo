import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../store/actions/userActions";
import { Container, HeaderContainer, LogoutAction } from "./styles";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <HeaderContainer>
        <LogoutAction onClick={handleLogout}>
          <ArrowBackIcon />
          <p>Sair</p>
        </LogoutAction>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
