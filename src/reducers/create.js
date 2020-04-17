const initial = {
  contract: {
    from: "NEW",
    existingContracts: {
      contracts: [],
      isLoading: false
    },
    nameRegistration: {
      isLoading: false
    },
    status: "READY",
    contract: JSON.stringify(
      {
        user: {
          indices: [{ properties: [{ id: "asc" }], unique: true }],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            }
          },
          additionalProperties: false
        }
      },
      null,
      2
    )
  },
  stage: "DEFINE_CONTRACT"
};

export default (state = initial, action) => {
  switch (action.type) {
    case "SET_CONTRACT_FROM":
      return {
        ...state,
        existingContracts: {
          ...state.existingContracts,
          isLoading:
            action.payload === "IMPORT" ? true : state.existingContracts.loading
        },
        contract: {
          ...state.contract,
          from: action.payload
        }
      };

    case "GOT_CURRENT_CONTRACTS":
      return {
        ...state
      };

    case "DO_CREATE_CONTRACT":
      return {
        ...state,
        contract: {
          ...state.contract,
          contract: action.payload,
          status: "VALIDATING_IDENTITY"
        }
      };

    case "CONTRACT_IDENTITY_CREATED":
      return {
        ...state,
        contract: {
          ...state.contract,
          identity: action.payload,
          status: "CREATING_CONTRACT"
        }
      };

    case "CONTRACT_CREATED":
      return {
        ...state,
        contract: {
          ...state.contract,
          status: "DONE"
        },
        stage: "SELECT_NAME"
      };

    case "DO_REGISTER_APP_NAME":
      return {
        ...state,
        nameRegistration: {
          ...state.nameRegistration,
          error: null,
          isLoading: true
        }
      };

    default:
      return state;
  }
};
