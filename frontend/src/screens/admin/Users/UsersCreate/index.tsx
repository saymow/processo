import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../../../components/core/Layout";
import Button from "../../../../components/ui/Button";
import Map from "../../../../components/ui/Map";
import Input from "../../../../components/ui/Input";
import Loading from "../../../../components/ui/Loading";
import SelectInput from "../../../../components/ui/SelectInput";
import { GlobalState } from "../../../../store";
import { userCreate } from "../../../../store/actions/userActions";
import { DefaultState } from "../../../../store/reducers/userReducers";
import * as formUtils from "../../../../utils/formUtils";
import { postalCodeWatcher } from "../../../../utils/watchers";
import { ArrowContainer, Container, Form, FormSpliter } from "./styles";

const UsersCreate: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userCreateState = useSelector<typeof GlobalState>(
    (state) => state.userCreate
  ) as DefaultState;

  useEffect(() => {
    if (userCreateState.error && userCreateState.reset) {
      toast.error(`Erro ao criar usuário: ${userCreateState.error.message}`);
      dispatch(userCreateState.reset());
    }
  }, [dispatch, userCreateState]);

  useEffect(() => {
    if (userCreateState.success && userCreateState.reset) {
      toast.success("Usuário criado com sucesso");
      dispatch(userCreateState.reset());
      history.goBack();
    }
  }, [dispatch, history, userCreateState]);

  return (
    <Layout>
      <Container>
        <ArrowContainer>
          <Link to="/">
            <ArrowBackIcon />
          </Link>
        </ArrowContainer>
        {userCreateState.loading ? (
          <Loading />
        ) : (
          <Formik
            initialValues={{
              name: "",
              email: "",
              username: "",
              telephone: "",
              role: "",
              password: "",
              confirmPassword: "",
              postal_code: "",
              state: "",
              city: "",
              neighborhood: "",
              street: "",
              number: 0,
              lat: 0,
              lng: 0,
              mapLng: 0,
              mapLat: 0,
            }}
            validationSchema={formUtils.userCreateSchema}
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
              };

              dispatch(userCreate(formmatedData));
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
                  <Input
                    id="telephone"
                    name="telephone"
                    mask={formUtils.TELEPHONE_MASK}
                    placeholder="Telefone"
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
                    CRIAR
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
