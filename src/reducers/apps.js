const initial = {
  contracts: {},
  isLoading: false,
  selected: null,
  current: {
    contentType: "react",
    props: {},
    content: `export default () => {
      return <h1>Hello World</h1>
    }`
  }
};

export default (state = initial, action) => {
  switch (action.type) {
    case "WALLET_READY":
      return {
        ...state,
        contracts: action.payload.apps
      };

    case "DO_SELECT_EDIT_APPLICATION":
      return {
        ...state,
        isLoading: true,
        selected: action.payload,
        current: {
          ...initial.current
        }
      };

    default:
      return state;
  }
};
