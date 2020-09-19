import { theme as chakraTheme } from "@chakra-ui/core";

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  fonts: {
    ...chakraTheme.fonts,
    body:
      '-apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
};

theme.light = {
  color: theme.colors.gray[700],
  bg: theme.colors.gray[400],
  borderColor: theme.colors.gray[800],
  placeholderColor: theme.colors.gray[500],
  hover: {
    bg: theme.colors.gray[300],
  },
};

theme.dark = {
  color: theme.colors.whiteAlpha[900],
  bg: theme.colors.gray[700],
  borderColor: theme.colors.whiteAlpha[300],
  placeholderColor: theme.colors.whiteAlpha[400],
  hover: {
    bg: theme.colors.gray[800],
  },
};

export default theme;
