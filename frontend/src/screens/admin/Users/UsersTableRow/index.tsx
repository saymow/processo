import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Button,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  user: any;
  onDelete: () => void;
}

const UsersTableRow: React.FC<Props> = ({ user, onDelete }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{user.id}</TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.telephone}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell align="center">
          <Link to={`usuarios/${user.id}/editar`}>
            <Button color="primary" variant="outlined">
              Editar
            </Button>
          </Link>
        </TableCell>
        <TableCell align="center">
          <Button color="secondary" variant="outlined" onClick={onDelete}>
            Excluir
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Endereço
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Estado</TableCell>
                    <TableCell>Cidade</TableCell>
                    <TableCell>Bairro</TableCell>
                    <TableCell>CEP</TableCell>
                    <TableCell>Rua</TableCell>
                    <TableCell>Número</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{user.address.state}</TableCell>
                    <TableCell>{user.address.city}</TableCell>
                    <TableCell>{user.address.neighborhood}</TableCell>
                    <TableCell>{user.address.postal_code}</TableCell>
                    <TableCell>{user.address.street}</TableCell>
                    <TableCell>{user.address.number}</TableCell>
                    <TableCell>{user.address.lat}</TableCell>
                    <TableCell>{user.address.lng}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default UsersTableRow;
