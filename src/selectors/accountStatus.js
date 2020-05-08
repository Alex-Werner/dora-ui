import { createSelector } from "reselect";

const account = state => state.account;

export default createSelector([account], account => {
  if (!account.showWizard) return "HIDDEN";

  if (account.current.username) return "HIDDEN";

  if (!account.current.from) {
    if (Object.keys(account.available).length === 0) {
      return "SELECT_NEW_ACCOUNT_FROM";
    } else {
      return "SELECT_ACCOUNT";
    }
  }

  if (account.current.from === "CREATE" && !account.current.confirmed) {
    return "NEW_WALLET";
  }

  if (!account.isReady) return "LOADING";

  if (account.current.id && account.current.balance === 0) {
    return "FUNDS_REQUIRED";
  }

  if (account.current.id && !account.current.username) {
    return "USERNAME_REQUIRED";
  }

  return "HIDDEN";
});
