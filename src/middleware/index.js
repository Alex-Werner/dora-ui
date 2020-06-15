import { applyMiddleware } from "redux";

import dash from "./dash";
import localStorage from "./localStorage";

export default applyMiddleware(dash, localStorage);
