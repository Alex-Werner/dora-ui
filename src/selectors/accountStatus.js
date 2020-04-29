import { createSelector } from "reselect";

const account = state => state.account;

export default createSelector([account], account => {
  if (!account.showWizard || !account.isReady) return "HIDDEN";

  if (!account.current.from) {
    console.log(account.available);
    if (Object.keys(account.available).length === 0) {
      return "SELECT_NEW_ACCOUNT_FROM";
    } else {
      return "SELECT_ACCOUNT";
    }
  }

  return "HIDDEN";
});
