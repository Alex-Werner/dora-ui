import { combineReducers } from "redux-immutable";
import { Map } from "immutable";

import wallet from "./wallet";
import wizard from "./wizard";
import loading from "./loading";
// import create from "./create";
// import apps from "./apps";
import error from "./error";

export default combineReducers({
  // create,
  // apps,
  wallet,
  wizard,
  loading,
  error
});
