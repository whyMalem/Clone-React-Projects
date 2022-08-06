import { combineReducers } from "redux";

import authReducer from "./authReducer";
import uploadReducer from "./uploadReducer";

export const reducers = combineReducers({ authReducer, uploadReducer });
