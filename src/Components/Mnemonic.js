import React from "react";

import { MnemonicList } from "../Styles";

function Mnemonic({ children }) {
  if (typeof children !== "string") return null;

  const mnemonic = children.split(" ");

  return (
    <MnemonicList>
      {mnemonic.map(word => {
        return <li>{word}</li>;
      })}
    </MnemonicList>
  );
}

export default React.memo(Mnemonic);
