export default {
  colors: {
    primary: "#5c8cbf",
    dash: "#008DE4",
    action: "#fcec35",
    actionHighlight: "#ffeb17",
    white: "#fffefa",
    light: [
      "rgba(255, 255, 255, 0.1)",
      "rgba(255, 255, 255, 0.2)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.8)"
    ],
    dark: [
      "rgba(0, 0, 0, 0.1)",
      "rgba(0, 0, 0, 0.2)",
      "rgba(0, 0, 0, 0.3)",
      "rgba(0, 0, 0, 0.5)",
      "rgba(0, 0, 0, 0.8)"
    ]
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    brand: "'Nova Round', serif",
    mono: "monospace"
  },
  fontWeights: {
    heading: 400,
    body: 400
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25
  },
  radii: {
    default: 2
  },
  buttons: {
    ghost: {
      px: 2,
      py: 2,
      background: "transparent",
      border: "none",
      cursor: "pointer"
    },
    action: {
      bg: "action",
      px: 3,
      py: 2,
      fontSize: 3,
      cursor: "pointer",
      fontWeight: "bold",
      color: "dark.4",
      borderWidth: 1,
      borderStyle: "solid",
      borderRightColor: "dark.0",
      borderBottomColor: "dark.0",
      borderTopColor: "light.0",
      borderLeftColor: "light.0",
      outline: "none",
      "&:hover": {
        bg: "actionHighlight"
      },
      "&:active": {
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 0,
        borderRightWidth: 0
      }
    }
  },
  variants: {
    formRow: {
      p: 0,
      mt: 3,
      border: "none",
      "> button:first-child": {
        float: "right"
      }
    }
  },
  forms: {
    lightOnDark: {
      bg: "dark.1",
      borderColor: "dark.2",
      color: "light.4",
      fontFamily: "mono"
    },
    input: {
      fontFamily: "body",
      padding: 2
    },
    label: {
      fontSize: 1,
      fontWeight: "bold",
      lineHeight: 1
    },
    check: {
      fontSize: 1,
      fontWeight: "bold",
      boxShadow: "small",
      alignItems: "center",
      borderRadius: "default",
      bg: "light.4",
      px: 1,
      py: 3,
      mt: 2,
      cursor: "pointer",
      "& > div": {
        ml: 2
      }
    },
    radio: {
      "&:checked": {
        color: "primary"
      }
    }
  },
  text: {
    p: {
      fontSize: 2,
      color: "dark.4",
      mt: 3,
      lineHeight: 1.4
    },
    heading: {
      fontWeight: "bold",
      lineHeight: 1
    }
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)"
  }
};
