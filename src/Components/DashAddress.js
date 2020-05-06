import React from "react";
import { Copy } from "@styled-icons/fa-regular/Copy";
import { CheckmarkOutline } from "@styled-icons/evaicons-outline/CheckmarkOutline";

import { DashAddressContainer, Textarea, GhostButton } from "../Styles";

function DashAddress({ children: address }) {
  const [copySuccess, setCopySuccess] = React.useState(false);
  const textAreaRef = React.useRef();
  const buttonRef = React.useRef();

  React.useEffect(() => {
    if (!copySuccess) return;
    setTimeout(() => setCopySuccess(false), 2000);
  }, [copySuccess]);

  const copy = e => {
    textAreaRef.current.select();
    document.execCommand("copy");
    setCopySuccess(true);
  };

  if (typeof address !== "string") return null;

  return (
    <DashAddressContainer onClick={copy}>
      {document.queryCommandSupported("copy") && (
        <GhostButton ref={buttonRef} title="Copy to clipboard">
          <Copy size={16} />
        </GhostButton>
      )}
      {copySuccess && (
        <div>
          <CheckmarkOutline size={16} /> Copied to clipboard
        </div>
      )}
      <Textarea
        readOnly
        ref={textAreaRef}
        rows={1}
        fontFamily="monospace"
        fontSize={0}
        value={address}
      ></Textarea>
    </DashAddressContainer>
  );
}

export default React.memo(DashAddress);
