import React from "react";
import { Box } from "rebass";

function Mnemonic({ children }) {
  if (typeof children !== "string") return null;

  const mnemonic = children.split(" ");

  return (
    <Box as="ul" variant="mnemonic">
      {mnemonic.map(word => {
        return <Box as="li">{word}</Box>;
      })}
    </Box>
  );
}

export default React.memo(Mnemonic);
