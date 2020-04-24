import { combineReducers } from "redux";

import account from "./account";
import create from "./create";
import apps from "./apps";

export default combineReducers({ account, create, apps });
