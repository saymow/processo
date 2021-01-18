import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../../components/core/Layout";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import Loading from "../../../../components/ui/Loading";
import SelectInput from "../../../../components/ui/SelectInput";
import { GlobalState } from "../../../../store";
import { userShow, userUpdate } from "../../../../store/actions/userActions";
import {
  DefaultState,
  UserShowState,
} from "../../../../store/reducers/userReducers";
import * as formUtils from "../../../../utils/formUtils";
import { postalCodeWatcher } from "../../../../utils/watchers";
import Map from "../../../../components/ui/Map";
import {
  ArrowContainer,
  Container,
  InputBlocker,
  Form,
  FormSpliter,
} from "./styles";

const UsersCreate: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [gonnaChangePass, setGonnaChangePass] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const userUpdateState = useSelector<typeof GlobalState>(
    (state) => state.userUpdate
  ) as DefaultState;

  const userShowState = useSelector<typeof GlobalState>(
    (state) => state.userShow
  ) as UserShowState;

  useEffect(() => {
    dispatch(userShow(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userShowState.error && userShowState.reset) {
      dispatch(`Usuário não encontrado: ${userShowState.error.message}`);
      dispatch(userShowState.reset());
      history.goBack();
    }
  }, [history, dispatch, userShowState]);

  useEffect(() => {
    if (userUpdateState.error && userUpdateState.reset) {
      toast.error(`Erro ao editar usuário: ${userUpdateState.error.message}`);
      dispatch(userUpdateState.reset());
    }
  }, [dispatch, userUpdateState]);

  useEffect(() => {
    if (userUpdateState.success && userUpdateState.reset) {
      toast.success("Usuário editado com sucesso");
      dispatch(userUpdateState.reset());
      history.goBack();
    }
  }, [dispatch, history, userUpdateState]);

  return (
    <Layout>
      <Container>
        <ArrowContainer>
          <Link to="/">
            <ArrowBackIcon />
          </Link>
        </ArrowContainer>
        {userShowState.loading || !userShowState.user ? (
          <Loading />
        ) : (
          <Formik
            initialValues={{
              name: userShowState.user.name,
              email: userShowState.user.email,
              username: userShowState.user.username,
              telephone: userShowState.user.telephone,
              role: userShowState.user.role,
              password: "",
              confirmPassword: "",
              state: userShowState.user.address.state,
              city: userShowState.user.address.city,
              neighborhood: userShowState.user.address.neighborhood,
              street: userShowState.user.address.street,
              postal_code: userShowState.user.address.postal_code,
              number: userShowState.user.address.number,
              lat: userShowState.user.address.lat,
              lng: userShowState.user.address.lng,
              mapLat: userShowState.user.address.lat,
              mapLng: userShowState.user.address.lng,
            }}
            validate={formUtils.userEditValidation.bind(null, gonnaChangePass)}
            onSubmit={(values) => {
              const formmatedData = {
                name: values.name,
                email: values.email,
                username: values.username,
                telephone: values.telephone,
                role: values.role,
                password: values.password,
                address: {
                  state: values.state,
                  city: values.city,
                  neighborhood: values.neighborhood,
                  postal_code: values.postal_code,
                  street: values.street,
                  number: values.number,
                  lat: values.lat,
                  lng: values.lng,
                },
              } as any;

              if (!gonnaChangePass) delete formmatedData.password;

              dispatch(userUpdate(id, formmatedData));
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <FormSpliter>
                  <Input id="name" name="name" placeholder="Nome" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                  />
                  <Input id="username" name="username" placeholder="Username" />
                  <Input
                    id="telephone"
                    name="telephone"
                    mask={formUtils.TELEPHONE_MASK}
                    placeholder="Registro"
                  />
                  <SelectInput
                    id="role"
                    name="role"
                    label="Nível de acesso"
                    options={[
                      { text: "Administrador", value: "ADMIN" },
                      { text: "Usuário", value: "CLIENT" },
                    ]}
                  />
                  <Button
                    type="button"
                    variant="fill"
                    onClick={() => setGonnaChangePass((prev) => !prev)}
                  >
                    {gonnaChangePass ? "NÃO MUDAR SENHA" : "Mudar senha"}
                  </Button>
                  {gonnaChangePass && (
                    <InputBlocker>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                      />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmação da senha"
                      />
                    </InputBlocker>
                  )}
                </FormSpliter>
                <FormSpliter>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    mask={formUtils.POSTALCODE_MASK}
                    onBlurWatcher={postalCodeWatcher.bind(formik)}
                    placeholder="CEP"
                  />
                  <Input id="state" name="state" placeholder="Estado" />
                  <Input id="city" name="city" placeholder="Cidade" />
                  <Input
                    id="neighborhood"
                    name="neighborhood"
                    placeholder="Bairro"
                  />
                  <Input id="street" name="street" placeholder="Rua" />
                  <Input
                    type="number"
                    id="number"
                    name="number"
                    placeholder="Numero"
                  />
                </FormSpliter>
                <FormSpliter>
                  <Map
                    pos={{
                      map: {
                        lat: formik.values.mapLat,
                        lng: formik.values.mapLng,
                      },
                      marker: {
                        lat: formik.values.lat,
                        lng: formik.values.lng,
                      },
                    }}
                    onSelectCoordinate={(cords) => {
                      formik.setFieldValue("lat", String(cords.lat));
                      formik.setFieldValue("lng", String(cords.lng));
                    }}
                  />
                  <Button variant="fill" type="submit">
                    EDITAR
                  </Button>
                </FormSpliter>
              </Form>
            )}
          </Formik>
        )}
      </Container>
    </Layout>
  );
};

export default UsersCreate;
