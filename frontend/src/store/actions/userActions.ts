import { AxiosRequestConfig } from "axios";
import api from "../../services/api";
import {
  restoreCredentials,
  storeCredentials,
  removeCredentials,
} from "../../utils";
import {
  UserSessionAction,
  UserLoginAction,
  UserListAction,
  UserDeleteAction,
  UserCreateAction,
  UserShowAction,
  UserUpdateAction,
} from "../reducers/userReducers";

export const login = (username: string, password: string) => async (
  dispatch: (arg0: UserSessionAction | UserLoginAction) => void
) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await api.post("/session", { username, password });

    storeCredentials(data.token);

    dispatch({ type: "SESSION_SUCCESS", payload: data });
    dispatch({ type: "USER_LOGIN_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const connect = () => async (
  dispatch: (arg0: UserSessionAction) => void
) => {
  try {
    dispatch({ type: "SESSION_REQUEST" });

    const token = restoreCredentials();

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    const { data } = await api.post("/session/me", {}, options);

    dispatch({ type: "SESSION_SUCCESS", payload: { ...data, token } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "SESSION_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const logout = () => {
  removeCredentials();
  return { type: "SESSION_LOGOUT" };
};

export const userList = () => async (
  dispatch: (arg0: UserListAction) => void,
  getState: () => any
) => {
  try {
    dispatch({ type: "USER_LIST_REQUEST" });

    const token = getState().userSession.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    const { data } = await api.get("user", options);

    dispatch({ type: "USER_LIST_SUCCESS", payload: { users: data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_LIST_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userDelete = (id: string) => async (
  dispatch: (arg0: UserDeleteAction) => void,
  getState: () => any
) => {
  try {
    dispatch({ type: "USER_DELETE_REQUEST" });

    const token = getState().userSession.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    await api.delete(`user/${id}`, options);

    dispatch({ type: "USER_DELETE_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_DELETE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userCreate = (data: any) => async (
  dispatch: (arg0: UserCreateAction) => void,
  getState: () => any
) => {
  try {
    dispatch({ type: "USER_CREATE_REQUEST" });

    const token = getState().userSession.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    await api.post("/user", data, options);

    dispatch({ type: "USER_CREATE_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_CREATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userShow = (id: string) => async (
  dispatch: (arg0: UserShowAction) => void,
  getState: () => any
) => {
  try {
    dispatch({ type: "USER_SHOW_REQUEST" });

    const token = getState().userSession.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    const { data } = await api.get(`/user/${id}`, options);

    dispatch({ type: "USER_SHOW_SUCCESS", payload: { user: data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_SHOW_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};

export const userUpdate = (id: string, data: any) => async (
  dispatch: (arg0: UserUpdateAction) => void,
  getState: () => any
) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });

    const token = getState().userSession.user.token;

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    } as AxiosRequestConfig;

    await api.put(`/user/${id}`, data, options);

    dispatch({ type: "USER_UPDATE_SUCCESS" });
  } catch (err) {
    console.log(err);
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload: {
        message: err?.response?.data?.message || "Internal server error!",
      },
    });
  }
};
