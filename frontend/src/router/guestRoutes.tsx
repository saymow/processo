import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "../screens/guest/SignIn";

const GuestRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default GuestRouter;
