import { description } from "package.json";
import { Box, Heading, useColorMode, useTheme } from "@chakra-ui/core";
import { Link } from "./link";

export const Header = (props) => {
  const theme = useTheme();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      py={5}
      textAlign="center"
      bg={theme[colorMode].bg}
      style={{ filter: "brightness(120%)" }}
      {...props}
    >
      <Heading as="h1">
        <Link href="/">{description}</Link>
      </Heading>
    </Box>
  );
};
