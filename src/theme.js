export default {
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
    brand: "'Nova Round', serif",
    mono: "monospace"
  },
  colors: {
    text: "#402d00",
    body: "#fffefa",
    background: "#fffefa",
    primary: "#5c8cbf",
    secondary: "light.5",
    accent: "#fcec35",
    highlight: "#ffeb17",
    muted: "dark.0",
    dash: "#008DE4",
    error: "#ffb940",
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
  fontSizes: [11, 12, 13, 14, 16, 20, 24, 33, 46],
  space: [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  fontWeights: {
    heading: "bold",
    body: "normal"
  },
  lineHeights: {
    text: 1.4,
    regular: 1,
    heading: 1,
    body: 1
  },
  radii: {
    default: 2
  },
  text: {
    body: {
      fontSize: 3
    },
    heading: {
      fontWeight: "heading"
    }
  },
  styles: {
    root: {
      fontFamily: "body",
      margin: 0,
      padding: 0
    },
    p: {
      lineHeight: "text"
    }
  },
  buttons: {
    ghost: {
      px: 2,
      py: 2,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: "text"
    },
    action: {
      bg: "highlight",
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
      ":disabled": {
        opacity: 0.6,
        cursor: "default"
      },
      "&:hover": {
        ":not(:disabled)": {
          bg: "actionHighlight",
          color: "black"
        }
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
    list: {
      mt: 3,
      ml: 4,
      p: 0,
      fontSize: 2,
      listStylePosition: "outside",
      li: {
        mt: 2
      }
    },
    mnemonic: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      listStyle: "none",
      m: 0,
      mt: 2,
      p: 0,
      li: {
        m: 0,
        py: 1,
        flex: "0 0 30%",
        bg: "light.4",
        textAlign: "center",
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "dark.0",
        mt: 2
      }
    },
    formRow: {
      p: 0,
      mt: 3,
      border: "none",
      "> button:first-child": {
        float: "right"
      }
    }
  },
  layout: {
    container: {
      px: [6, 7],
      flexWrap: "wrap"
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
      padding: 4
    },
    textarea: {
      borderColor: "dark.1",
      bg: "light.4",
      resize: "none"
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
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)"
  }
};
