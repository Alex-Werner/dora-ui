import React from "react";
import { connect } from "react-redux";

import { account, balance } from "../selectors";
import { LoadingPayment, PaymentReceived, PaymentTick } from "../Styles";
import LoadingInline from "./LoadingInline";
import DashAmount from "./DashAmount";

function AwaitPayment({ incomingPayment, balance }) {
  return (
    <LoadingPayment isReceived={!!incomingPayment}>
      <LoadingInline />
      <p>Waiting to receive Dash...</p>
      <PaymentReceived isVisible={!!incomingPayment}>
        <p>
          <PaymentTick />
          Payment received. <DashAmount size={5}>{incomingPayment}</DashAmount>
        </p>
      </PaymentReceived>
    </LoadingPayment>
  );
}

const stateToProps = state => {
  return {
    incomingPayment: account(state).getIn(["incomingPayment", "amount"]),
    balance: balance(state).get("confirmed")
  };
};

export default connect(stateToProps)(React.memo(AwaitPayment));
