// https://raw.githubusercontent.com/chakra-ui/chakra-ui/develop/examples/nextjs-typescript/components/NextChakraLink.tsx
import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/core";

export const Link = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  prefetch,
  children,
  ...chakraProps
}) => {
  return (
    <NextLink
      passHref={true}
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
    >
      <ChakraLink {...chakraProps}>{children}</ChakraLink>
    </NextLink>
  );
};
