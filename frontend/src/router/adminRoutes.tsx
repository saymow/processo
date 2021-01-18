import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Users from "../screens/admin/Users";
import UsersCreate from "../screens/admin/Users/UsersCreate";
import UsersUpdate from "../screens/admin/Users/UsersUpdate";

const AdminRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Users} />
        <Route path="/usuarios/criar" component={UsersCreate} />
        <Route path="/usuarios/:id/editar" component={UsersUpdate} />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRouter;
