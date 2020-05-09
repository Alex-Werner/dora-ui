import SecureLS from "secure-ls";

const ls = new SecureLS();

export default store => next => action => {
  next(action);

  switch (action.type) {
    case "INIT":
      store.dispatch({
        type: "ACCOUNTS_LOADED",
        payload: {
          available: lsGet("saved_accounts", {}),
          selectedId: lsGet("selected_account_id", null)
        }
      });
      break;

    case "SELECT_ACCOUNT":
      lsSet("selected_account_id", action.payload);
      break;

    case "CONFIRM_NEW_WALLET":
      const current = store.getState().account.current;
      const alreadySaved = lsGet("saved_accounts", {});
      const updatedAccounts = {
        available: {
          ...alreadySaved,
          [current.id]: current
        },
        selectedId: current.id
      };

      lsSet("selected_account_id", updatedAccounts.selectedId);
      lsSet("saved_accounts", updatedAccounts.available);

      store.dispatch({
        type: "UPDATE_ACCOUNTS_FROM_LOCAL_STORAGE",
        payload: updatedAccounts
      });
      break;

    default:
      return;
  }
};

export function lsGet(key, defaultValue) {
  const result = ls.get(key);
  if (!result || !result.length) return defaultValue;

  const firstChar = result[0];
  return firstChar === "{" || firstChar === "[" ? JSON.parse(result) : result;
}

export function lsSet(key, value) {
  const valueToSave =
    !!value && typeof value === "object" ? JSON.stringify(value) : `${value}`;
  ls.set(key, valueToSave);
}
