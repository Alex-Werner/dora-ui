import { combineReducers } from "redux";

import wallet from "./wallet";
import create from "./create";
import apps from "./apps";

export default combineReducers({ wallet, create, apps });
