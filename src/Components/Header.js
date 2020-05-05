/** @jsx jsx */
import { Box, jsx, Container } from "theme-ui";

import Logo from "./Logo";
import URL from "./URL";
import AccountMenu from "./AccountMenu";

function Header() {
  return (
    <Container
      sx={{
        bg: "primary",
        alignItems: "center",
        py: [2, 0],
        justifyContent: "space-between",
        color: "body"
      }}
    >
      <Box flex="0 0 25%">
        <Logo />
      </Box>
      <Box
        sx={{
          flex: ["0 0 100%", "0 0 50%"],
          maxWidth: 1000,
          order: [3, 0],
          mt: [2, 0]
        }}
      >
        <URL />
      </Box>
      <Box
        sx={{
          flex: ["0 0 75%", "0 0 25%"],
          color: "white",
          textAlign: "right",
          position: "relative",
          fontSize: 2
        }}
      >
        <AccountMenu />
      </Box>
    </Container>
  );
}

export default Header;
