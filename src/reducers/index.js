import { combineReducers } from "redux-immutable";
import { Map } from "immutable";

// import account from "./account";
import wallet from "./wallet";
import wizard from "./wizard";
// import identity from "./identity";
// import names from "./names";
import loading from "./loading";
// import create from "./create";
// import apps from "./apps";
// import error from "./error";

export default combineReducers({
  // account,
  // create,
  // apps,
  wallet,
  wizard,
  loading
  // identity,
  // names,
  // error
});
