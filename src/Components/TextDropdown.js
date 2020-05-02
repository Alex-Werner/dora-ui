import React from "react";
import { Button, Box } from "rebass";
import { ChevronRight } from "@styled-icons/entypo/ChevronRight";
import { ChevronDown } from "@styled-icons/entypo/ChevronDown";

function TextDropdown({ children, title }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const Chevron = isVisible ? ChevronDown : ChevronRight;

  return (
    <Box mt={3}>
      <Button
        variant="ghost"
        color="primary"
        onClick={e => setIsVisible(!isVisible)}
        sx={{ paddingLeft: 0, textDecoration: "underline" }}
      >
        <Chevron size={20} style={{ marginTop: -3, marginLeft: -3 }} />
        {title}
      </Button>
      <Box sx={{ overflow: "hidden", height: isVisible ? "auto" : 0 }}>
        {children}
      </Box>
    </Box>
  );
}

export default React.memo(TextDropdown);
