import { applyMiddleware } from "redux";

import dash from "./dash";
import localStorage from "./localStorage";
import OLD_dash from "./dash.BAK";
import OLD_localStorage from "./localStorage.BAK";

export default applyMiddleware(dash, localStorage);
