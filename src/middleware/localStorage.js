import SecureLS from "secure-ls";

const ls = new SecureLS();

export default store => next => action => {
  next(action);

  const { dispatch, getState } = store;
  const { payload } = action;

  switch (action.type) {
    case "INIT":
      const wallet = lsGet("wallet");
      if (wallet) {
        dispatch({ type: "WALLET_FOUND_IN_LOCAL_STORAGE", payload: wallet });
      } else {
        dispatch({ type: "WALLET_NOT_FOUND_IN_LOCAL_STORAGE" });
      }
      break;

    case "CONFIRM_MNEMONIC":
      lsSet("wallet", getState().wallet);
      break;

    case "WALLET_LOADED":
      const lastSelected = lsGet("wallet.selectedAccount");

      if (typeof lastSelected !== "number") return;

      dispatch({
        type: "SELECTED_ACCOUNT_FOUND_IN_LOCAL_STORAGE",
        payload: lastSelected
      });
      break;

    case "SELECT_ACCOUNT":
    case "ACCOUNT_CREATED_ON_NEW_WALLET":
      lsSet("wallet.selectedAccount", payload);
      break;

    case "ACCOUNT_CREATED_ON_NEW_WALLET":
    case "ACCOUNT_CREATED":
      lsSet(`accounts.${payload}.names`, []);
      lsSet(`accounts.${payload}.selectedName`, null);
      break;

    case "ACCOUNT_LOADED":
      const names = lsGet(`accounts.${payload}.names`, []);
      const selectedName = lsGet(`accounts.${payload}.selectedName`);

      const nameLoadType = names.length
        ? "ACCOUNT_NAMES_FOUND_IN_LOCAL_STORAGE"
        : "ACCOUNT_NAMES_NOT_FOUND_IN_LOCAL_STORAGE";

      dispatch({ type: nameLoadType, payload: { names, selectedName } });
      break;

    case "ACCOUNT_NAMES_NOT_FOUND_IN_LOCAL_STORAGE":
      // If user has already created an identity but not username, unlikely
      // occurrance. In this case, the created identity will be available for use.
      const createdIdentity = lsGet(`accounts.${payload}.createdIdentity`);
      const createdIdentityLoadType = createdIdentity
        ? "CREATED_IDENTITY_FOUND_IN_LOCAL_STORAGE"
        : "CREATED_IDENTITY_NOT_FOUND_IN_LOCAL_STORAGE";

      dispatch({ type: createdIdentityLoadType, payload: createdIdentity });
      break;

    case "CONFIRM_MNEMONIC":
      lsUpdate("wallet", { mnemonicConfirmed: true });
      break;

    default:
      return;
  }
};

export function lsGet(key, defaultValue = null) {
  const result = ls.get(key);
  if (!result || !result.length) return defaultValue;

  const firstChar = result[0];
  return firstChar === "{" || firstChar === "["
    ? JSON.parse(result)
    : `${parseFloat(result)}` === result
    ? parseFloat(result)
    : result;
}

export function lsSet(key, value) {
  const valueToSave =
    !!value && typeof value === "object" ? JSON.stringify(value) : `${value}`;
  ls.set(key, valueToSave);
}

export function lsUpdate(key, update) {
  const currentValue = lsGet(key);

  lsSet(key, {
    ...currentValue,
    ...update
  });
}
