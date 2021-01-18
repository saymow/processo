import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../store";
import { UserSessionState } from "../store/reducers/userReducers";
import AdminRouter from "./adminRoutes";
import GuestRouter from "./guestRoutes";
import UserRouter from "./userRoutes";
import * as userActions from "../store/actions/userActions";
import Loading from "../screens/Loading";

const Router: React.FC = () => {
  const dispatch = useDispatch();

  const { auth, user, loading } = useSelector<typeof GlobalState>(
    (state) => state.userSession
  ) as UserSessionState;

  useEffect(() => {
    dispatch(userActions.connect());
  }, [dispatch]);

  return loading ? (
    <Loading />
  ) : !auth ? (
    <GuestRouter />
  ) : user?.role === "ADMIN" ? (
    <AdminRouter />
  ) : (
    <UserRouter />
  );
};

export default Router;
