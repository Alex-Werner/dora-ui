import React from "react";

function Currency({ children }) {
  const amount = typeof children === "string" ? parseFloat(children) : children;

  return <span className="dash-amount">{amount}</span>;
}

export default React.memo(Currency);
