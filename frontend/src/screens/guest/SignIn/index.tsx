import React, { useEffect } from "react";
import { Formik } from "formik";
import * as formUtils from "../../../utils/formUtils";

import { Container, AsideDecorator, AuthContainer, Form } from "./styles";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/actions/userActions";
import { GlobalState } from "../../../store";
import { DefaultState } from "../../../store/reducers/userReducers";
import { toast } from "react-toastify";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const userLoginState = useSelector<typeof GlobalState>(
    (state) => state.userLogin
  ) as DefaultState;

  useEffect(() => {
    if (userLoginState.error && userLoginState.reset) {
      toast.error(`Erro ao logar: ${userLoginState.error.message}`);
      dispatch(userLoginState.reset());
    }
  }, [dispatch, userLoginState]);

  return (
    <Container>
      <AsideDecorator></AsideDecorator>
      <AuthContainer>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={formUtils.loginSchema}
          onSubmit={(values) => {
            dispatch(login(values.username, values.password));
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Input id="username" name="username" placeholder="Usuário" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Senha"
              />
              <Button variant="fill">ENTRAR</Button>
            </Form>
          )}
        </Formik>
      </AuthContainer>
    </Container>
  );
};

export default SignIn;
