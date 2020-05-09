import { combineReducers } from "redux";

import account from "./account";
import wallet from "./wallet";
import wizard from "./wizard";
import identity from "./identity";
import loading from "./loading";
import create from "./create";
import apps from "./apps";

export default combineReducers({
  account,
  create,
  apps,
  wallet,
  wizard,
  loading,
  identity
});
