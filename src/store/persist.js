/* Stolen and modified: https://github.com/elgerlambert/redux-localstorage */

export default function persistState(paths, config) {
  const cfg = {
    key: "redux",
    merge: mergeState,
    slicer: createSlicer,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
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

function createSlicer(paths) {
  switch (typeOf(paths)) {
    case "void":
      return state => state;
    case "string":
      return state => getSubset(state, [paths]);
    case "array":
      return state => getSubset(state, paths);
    default:
      return console.error(
        "Invalid paths argument, should be of type String, Array or Void"
      );
  }
}

function getSubset(obj, paths) {
  let subset = {};

  paths.forEach(key => {
    let slice = obj[key];
    if (slice) subset[key] = slice;
  });

  return subset;
}

function mergeState(initialState, persistedState) {
  return persistedState ? { ...initialState, ...persistedState } : initialState;
}

const _isArray =
  Array.isArray ||
  (Array.isArray = function(a) {
    return "" + a !== a && {}.toString.call(a) === "[object Array]";
  });

function typeOf(thing) {
  if (!thing) return "void";

  if (_isArray(thing)) {
    if (!thing.length) return "void";
    return "array";
  }

  return typeof thing;
}
