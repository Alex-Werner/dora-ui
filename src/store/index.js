import { createStore, compose } from "redux";
import Immutable, { Map } from "immutable";

import reducers from "../reducers";
import middleware from "../middleware";
import persist from "./persist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      serialize: {
        immutable: Immutable
      }
    })
  : compose;

const configureStore = () => {
  const persistKeys = ["wallet", "wizard"];
  const enhancers = composeEnhancers(middleware, persist(persistKeys));
  // const enhancers = composeEnhancers(middleware);
  const store = createStore(reducers, Map(), enhancers);

  if (module.hot) {
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers").default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
