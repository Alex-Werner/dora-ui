/* Stolen and modified for secure-ls and immutable: https://github.com/elgerlambert/redux-localstorage */
import { fromJS } from "immutable";

export default function persistState(paths, config) {
  const cfg = {
    key: "redux",
    merge: (initialState, persistedState) =>
      console.log(initialState) || initialState.mergeDeep(persistedState),
    slicer: paths => state =>
      paths ? state.filter((v, k) => paths.indexOf(k) > -1) : state,
    serialize: subset => JSON.stringify(subset.toJS()),
    deserialize: data => fromJS(JSON.parse(data)),
    ...config
  };

  const { key, merge, slicer, serialize, deserialize } = cfg;

  return next => (reducer, initialState, enhancer) => {
    if (typeof initialState === "function" && typeof enhancer === "undefined") {
      enhancer = initialState;
      initialState = undefined;
    }

    const persistedState = deserialize(localStorage.getItem(key));
    const finalInitialState = merge(initialState, persistedState);

    const store = next(reducer, finalInitialState, enhancer);
    const slicerFn = slicer(paths);

    store.subscribe(function() {
      const state = store.getState();
      const subset = slicerFn(state);

      try {
        localStorage.setItem(key, serialize(subset));
      } catch (e) {
        console.warn("Unable to persist state to localStorage:", e);
      }
    });

    return store;
  };
}
