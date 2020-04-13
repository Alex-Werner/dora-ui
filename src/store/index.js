import { createStore } from "redux";

import initial from "./initial";
import reducers from "../reducers";
import middleware from "../middleware";

export default createStore(reducers, initial, middleware);
