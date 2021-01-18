import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../../store";
import { userDelete, userList } from "../../../store/actions/userActions";
import {
  DefaultState,
  UserListState,
} from "../../../store/reducers/userReducers";
import Layout from "../../../components/core/Layout";

import { Container, ActionsContainer, SearchBox } from "./styles";
import BasicInput from "../../../components/ui/BasicInput";
import { Button } from "@material-ui/core";
import Loading from "../../Loading";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import UsersTableRow from "./UsersTableRow";

export default function BasicTable() {
  const [innerUsers, setInnerUsers] = useState<any[]>([]);

  const dispatch = useDispatch();

  const userListState = useSelector<typeof GlobalState>(
    (state) => state.userList
  ) as UserListState;

  const userDeleteState = useSelector<typeof GlobalState>(
    (state) => state.userDelete
  ) as DefaultState;

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);

  useEffect(() => {
    setInnerUsers(userListState.users);
  }, [userListState.users]);

  useEffect(() => {
    if (userDeleteState.success && userDeleteState.reset) {
      toast.success("Usuário deletado com sucesso!");
      dispatch(userList());
      dispatch(userDeleteState.reset());
    }
  }, [userDeleteState, dispatch]);

  useEffect(() => {
    if (userDeleteState.error && userDeleteState.reset) {
      toast.error(`Erro ao deletar usuário: ${userDeleteState.error}`);
      dispatch(userDeleteState.reset());
    }
  }, [userDeleteState, dispatch]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    let orderedUsers = userListState.users.filter((user) => {
      return (
        user.username.slice(0, value.length).toLocaleLowerCase() ===
        value.toLocaleLowerCase()
      );
    });

    setInnerUsers(orderedUsers);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Tem certeza de que deseja deletar o usuário?")) {
      dispatch(userDelete(id));
    }
  };

  return (
    <Layout>
      {userListState.loading ? (
        <Loading />
      ) : (
        <Container>
          <ActionsContainer>
            <SearchBox>
              <BasicInput
                id="search"
                placeholder="Buscar pelo usuário..."
                onChange={handleSearchTextChange}
              />
            </SearchBox>
            <Link to="/usuarios/criar">
              <Button variant="contained" color="primary">
                CRIAR
              </Button>
            </Link>
          </ActionsContainer>
          <TableContainer component={Paper}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Id</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Usuário</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>telefone</TableCell>
                    <TableCell>Nível de acesso</TableCell>
                    <TableCell align="center">Editar</TableCell>
                    <TableCell align="center">Excluir</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {innerUsers.map((user) => (
                    <UsersTableRow
                      key={user.id}
                      user={user}
                      onDelete={() => handleDeleteUser(user.id)}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableContainer>
        </Container>
      )}
    </Layout>
  );
}
