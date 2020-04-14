import React from "react";
import { connect } from "react-redux";

function WalletSelector({ available, selected, select }) {
  const availableIds = Object.keys(available);
  if (!availableIds) return null;

  return (
    <select onChange={e => select(e.target.value)}>
      {!!selected ? (
        <option value={selected}>{available[selected].name}</option>
      ) : (
        <option value="">Select a wallet...</option>
      )}
      {availableIds.map(id => {
        return (
          <option value={id} key={id}>
            {available[id].name}
          </option>
        );
      })}
    </select>
  );
}

const stateToProps = state => {
  return {
    available: state.wallet.availableWallets,
    selected: state.wallet.currentWalletId
  };
};

const dispatchToProps = dispatch => {
  return {
    select(id) {
      dispatch({ type: "DO_WALLET_SELECT", payload: id });
    }
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(React.memo(WalletSelector));
