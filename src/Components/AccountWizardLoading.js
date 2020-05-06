import React from "react";

import Spinner from "./Spinner";
import { ModalLoading, ModalLoadingIcon } from "../Styles";

function AccountWizardLoading({ children, Icon }) {
  return (
    <ModalLoading>
      <Spinner size={80} />
      <ModalLoadingIcon />
      {Icon && <Icon size={40} />}
      {children}
    </ModalLoading>
  );
}

export default React.memo(AccountWizardLoading);
