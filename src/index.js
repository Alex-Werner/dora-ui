import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./store";

const store = configureStore();

const render = Component =>
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <Component />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );

render(App);

if (module.hot && process.env.NODE_ENV !== "production") {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}
