export interface DefaultState {
  loading?: boolean;
  success?: boolean;
  error?: {
    message: String;
  };
  reset?: () => { type: string };
}

export interface UserSessionState extends DefaultState {
  user?: {
    id: string;
    role: "ADMIN" | "USER";
    token: string;
  };
  auth?: boolean;
}

export interface UserListState extends DefaultState {
  users: any[];
}

export interface UserShowState extends DefaultState {
  user?: any;
}

export type UserLoginAction =
  | {
      type: "USER_LOGIN_REQUEST";
    }
  | {
      type: "USER_LOGIN_SUCCESS";
    }
  | {
      type: "USER_LOGIN_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_LOGIN_RESET" };

export type UserSessionAction =
  | {
      type: "SESSION_REQUEST";
    }
  | {
      type: "SESSION_SUCCESS";
      payload: {
        id: string;
        role: "ADMIN" | "USER";
        token: string;
      };
    }
  | {
      type: "SESSION_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "SESSION_LOGOUT" };

export type UserListAction =
  | {
      type: "USER_LIST_REQUEST";
    }
  | {
      type: "USER_LIST_SUCCESS";
      payload: {
        users: any[];
      };
    }
  | {
      type: "USER_LIST_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_LIST_RESET" };

export type UserDeleteAction =
  | {
      type: "USER_DELETE_REQUEST";
    }
  | {
      type: "USER_DELETE_SUCCESS";
    }
  | {
      type: "USER_DELETE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_DELETE_RESET" };

export type UserShowAction =
  | {
      type: "USER_SHOW_REQUEST";
    }
  | {
      type: "USER_SHOW_SUCCESS";
      payload: { user: any };
    }
  | {
      type: "USER_SHOW_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_SHOW_RESET" };

export type UserCreateAction =
  | {
      type: "USER_CREATE_REQUEST";
    }
  | {
      type: "USER_CREATE_SUCCESS";
    }
  | {
      type: "USER_CREATE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_CREATE_RESET" };

export type UserUpdateAction =
  | {
      type: "USER_UPDATE_REQUEST";
    }
  | {
      type: "USER_UPDATE_SUCCESS";
    }
  | {
      type: "USER_UPDATE_FAIL";
      payload: {
        message: String;
      };
    }
  | { type: "USER_UPDATE_RESET" };

export const userLoginReducer = (
  state: DefaultState = {},
  action: UserLoginAction
) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return {
        loading: true,
        reset: () => ({ type: "USER_LOGIN_RESET" }),
      };
    case "USER_LOGIN_SUCCESS": {
      return { ...state, loading: false, success: true };
    }
    case "USER_LOGIN_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LOGIN_RESET":
      return {};
    default:
      return state;
  }
};

export const userSessionReducer = (
  state: UserSessionState = { loading: true },
  action: UserSessionAction
): UserSessionState => {
  switch (action.type) {
    case "SESSION_REQUEST":
      return { ...state, loading: true };
    case "SESSION_SUCCESS": {
      const { id, role, token } = action.payload;
      return {
        ...state,
        loading: false,
        user: { id, role, token },
        auth: true,
      };
    }
    case "SESSION_FAIL":
      return { ...state, loading: false, error: action.payload, auth: false };
    case "SESSION_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state: UserListState = { users: [] },
  action: UserListAction
): UserListState => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_LIST_RESET" }),
      };
    case "USER_LIST_SUCCESS": {
      const { users } = action.payload;
      return {
        ...state,
        success: true,
        loading: false,
        users,
      };
    }
    case "USER_LIST_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_LIST_RESET":
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (
  state: DefaultState = {},
  action: UserDeleteAction
): DefaultState => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_DELETE_RESET" }),
      };
    case "USER_DELETE_SUCCESS": {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case "USER_DELETE_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_DELETE_RESET":
      return {};
    default:
      return state;
  }
};

export const userShowReducer = (
  state: UserShowState = {},
  action: UserShowAction
): UserShowState => {
  switch (action.type) {
    case "USER_SHOW_REQUEST":
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_SHOW_RESET" }),
      };
    case "USER_SHOW_SUCCESS": {
      const { user } = action.payload;

      return {
        ...state,
        success: true,
        loading: false,
        user,
      };
    }
    case "USER_SHOW_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_SHOW_RESET":
      return {};
    default:
      return state;
  }
};

export const userCreateReducer = (
  state: DefaultState = {},
  action: UserCreateAction
): DefaultState => {
  switch (action.type) {
    case "USER_CREATE_REQUEST":
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_CREATE_RESET" }),
      };
    case "USER_CREATE_SUCCESS": {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case "USER_CREATE_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (
  state: DefaultState = {},
  action: UserUpdateAction
): DefaultState => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
        reset: () => ({ type: "USER_UPDATE_RESET" }),
      };
    case "USER_UPDATE_SUCCESS": {
      return {
        ...state,
        success: true,
        loading: false,
      };
    }
    case "USER_UPDATE_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "USER_UPDATE_RESET":
      return {};
    default:
      return state;
  }
};
