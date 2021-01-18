import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../screens/user/Home";

const UserRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default UserRouter;
