import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import Router from "./router";
import store from "./store";
import GlobalStyles from "./styles/GlobalStyles";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <ToastContainer />
      <Router />
    </Provider>
  );
};

export default App;
