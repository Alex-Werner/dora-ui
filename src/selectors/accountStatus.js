import { createSelector } from "reselect";

const account = state => state.account;

export default createSelector([account], account => {
  if (!account.showWizard || !account.isReady) return "HIDDEN";

  if (account.current.username) return "";

  if (!account.current.from) {
    if (Object.keys(account.available).length === 0) {
      return "SELECT_NEW_ACCOUNT_FROM";
    } else {
      return "SELECT_ACCOUNT";
    }
  }

  if (account.current.from === "CREATE") {
    if (!account.current.confirmed) return "NEW_WALLET";
    return "FUNDS_REQUIRED";
  }

  return "HIDDEN";
});
