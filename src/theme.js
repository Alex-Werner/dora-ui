export default {
  colors: {
    dash: "#008DE4",
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
    heading: "'Nova Round', serif",
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
    }
  }
};
