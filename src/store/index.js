import { createStore, compose } from "redux";

import reducers from "../reducers";
import middleware from "../middleware";
import persist from "./persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const persistKeys = ["account", "wallet", "wizard", "identity", "names"];
  const enhancers = composeEnhancers(middleware, persist(persistKeys));
  const store = createStore(reducers, {}, enhancers);

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
