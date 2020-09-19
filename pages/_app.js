import "./styles.css";
import { initializeStore, Provider as StateProvider } from "tree";
import { Provider as AuthProvider } from "next-auth/client";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import theme from "utils/theme";
import cookies from "next-cookies";

const App = ({ Component, pageProps, initialColorMode }) => {
  const { snapshot, session } = pageProps;
  const store = initializeStore(snapshot);
  const config = (theme) => ({
    light: theme.light,
    dark: theme.dark,
  });

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider value={initialColorMode}>
        <CSSReset config={config} />
        <AuthProvider
          options={{
            clientMaxAge: 0,
            keepAlive: 0,
          }}
          session={session}
        >
          <StateProvider value={store}>
            <Component {...pageProps} />
          </StateProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  const { isDarkMode = "false" } = cookies(ctx);
  return {
    pageProps,
    initialColorMode: isDarkMode === "true" ? "dark" : "light",
  };
};

export default App;
