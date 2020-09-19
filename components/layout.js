import { description } from "package.json";
import Head from "next/head";
import { useColorMode, Button, Box, useTheme } from "@chakra-ui/core";
import { Header } from "./header";
import { Nav } from "./nav";
import { Footer } from "./footer";

export default function Layout({ children }) {
  const theme = useTheme();

  // TODO: breaks nextjs static optimization
  // https://github.com/chakra-ui/chakra-ui/issues/349#issuecomment-607011991
  const { colorMode, toggleColorMode } = useColorMode();
  const handleToggleDarkMode = () => {
    toggleColorMode();
    document.cookie = `isDarkMode=${colorMode === "light"}`;
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{description}</title>
        {/*npm install -g mobx-devtools*/}
        <script src="//localhost:8098"></script>
      </Head>

      <Box as={Button} onClick={handleToggleDarkMode}></Box>

      <Header />

      <Nav />

      <Box
        as="main"
        flex="1 0 auto"
        mx={10}
        mb={20}
        p={5}
        rounded="lg"
        bg={theme[colorMode].bg}
        style={{ filter: "brightness(140%)" }}
      >
        {children}
      </Box>

      <Footer />
    </>
  );
}
