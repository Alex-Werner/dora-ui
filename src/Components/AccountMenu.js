import React from "react";
import { connect } from "react-redux";

import { AccountMenu, DisplayName, DropdownIcon, UserIcon } from "../Styles";
import AccountDropdownMenu from "./AccountDropdownMenu";
import LoadingInline from "./LoadingInline";
import { useWindowClick } from "../hooks";

function Account({ username, isLoading }) {
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false);
  useWindowClick(e => setDropdownIsVisible(false));

  const displayName = username
    ? `${username.length > 20 ? `${username.substring(0, 20)}...` : username}`
    : "(anonymous)";

  return (
    <AccountMenu
      onClick={e => e.stopPropagation()}
      isActive={dropdownIsVisible}
    >
      {isLoading ? (
        <LoadingInline size={0.6} />
      ) : (
        <a
          href="/user.dora.dash"
          onClick={e =>
            e.preventDefault() ||
            (!isLoading && setDropdownIsVisible(!dropdownIsVisible))
          }
        >
          <DisplayName>
            <UserIcon /> {displayName}
          </DisplayName>
          <DropdownIcon />
          <AccountDropdownMenu
            hide={e => setDropdownIsVisible(false)}
            isVisible={dropdownIsVisible}
          />
        </a>
      )}
    </AccountMenu>
  );
}

const stateToProps = state => {
  return {
    isLoading: state.loading.account,
    username:
      state.identity.selectedName && state.identity.selectedName.username
  };
};

export default connect(stateToProps)(React.memo(Account));
