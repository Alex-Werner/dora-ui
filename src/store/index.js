import { createStore, compose } from "redux";

import reducers from "../reducers";
import middleware from "../middleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, {}, composeEnhancers(middleware));
