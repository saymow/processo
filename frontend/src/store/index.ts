import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userCreateReducer,
  userDeleteReducer,
  userListReducer,
  userLoginReducer,
  userSessionReducer,
  userShowReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

export const GlobalState = {
  userLogin: userLoginReducer,
  userSession: userSessionReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userShow: userShowReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
};

const reduxStore = combineReducers(GlobalState);

const middlewares = [thunk];

const store = createStore(
  reduxStore,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
