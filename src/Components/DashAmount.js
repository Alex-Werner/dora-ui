import React from "react";

function DashAmount({ children: amount }) {
  if (typeof amount !== "number") return amount;
  return amount > 10000000 ? `${amount / 100000000} Dash` : `${amount} Duff`;
}

export default React.memo(DashAmount);
