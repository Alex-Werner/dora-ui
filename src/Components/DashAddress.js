import React from "react";
import { Box, Button } from "rebass";
import { Textarea } from "@rebass/forms";
import { Copy } from "@styled-icons/fa-regular/Copy";
import { CheckmarkOutline } from "@styled-icons/evaicons-outline/CheckmarkOutline";

function DashAddress({ children: address, ...props }) {
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
    <Box
      mt={3}
      {...props}
      sx={{ position: "relative", cursor: "pointer" }}
      onClick={copy}
    >
      {document.queryCommandSupported("copy") && (
        <Button
          variant="ghost"
          ref={buttonRef}
          color="primary"
          title="Copy to clipboard"
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <Copy size={16} />
        </Button>
      )}
      <Box
        sx={{
          opacity: copySuccess ? 1 : 0,
          position: "absolute",
          bottom: "100%",
          right: 0,
          transition: "opacity 150ms ease-in-out",
          borderRadiusTopLeft: "default",
          borderRadiusTopRight: "default"
        }}
        px={2}
        fontSize={1}
        py={2}
        bg="primary"
        color="white"
      >
        <CheckmarkOutline size={16} /> Copied to clipboard
      </Box>
      <Textarea
        readOnly
        ref={textAreaRef}
        rows={1}
        fontFamily="monospace"
        fontSize={0}
      >
        {address}
      </Textarea>
    </Box>
  );
}

export default React.memo(DashAddress);
