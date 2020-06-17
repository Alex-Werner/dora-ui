import React from "react";

import { LoadingInlineContainer, fontSize } from "../Styles";

function LoadingInline({ size = 1 }) {
  return (
    <LoadingInlineContainer scale={size}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingInlineContainer>
  );
}

export default React.memo(LoadingInline);
