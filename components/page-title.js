import { Heading } from "@chakra-ui/core";

export const PageTitle = ({ children }) => {
  return (
    <Heading size="lg" mb={5}>
      {children}
    </Heading>
  );
};

export const PageSubTitle = ({ children }) => {
  return (
    <Heading size="md" my={5}>
      {children}
    </Heading>
  );
};
