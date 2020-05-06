import React from "react";
import { ChevronRight } from "@styled-icons/entypo/ChevronRight";
import { ChevronDown } from "@styled-icons/entypo/ChevronDown";

import {
  GhostButton,
  TextDropdownContainer,
  TextDropdownContent
} from "../Styles";

function TextDropdown({ children, title }) {
  const [isVisible, setIsVisible] = React.useState(false);
  const Chevron = isVisible ? ChevronDown : ChevronRight;

  return (
    <TextDropdownContainer>
      <GhostButton onClick={e => setIsVisible(!isVisible)}>
        <Chevron size={20} />
        {title}
      </GhostButton>
      <TextDropdownContent>{children}</TextDropdownContent>
    </TextDropdownContainer>
  );
}

export default React.memo(TextDropdown);
