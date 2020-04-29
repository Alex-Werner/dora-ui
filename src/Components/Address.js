import React from "react";

function Address({ address }) {
  return <span className="address">{address}</span>;
}

export default React.memo(Address);
