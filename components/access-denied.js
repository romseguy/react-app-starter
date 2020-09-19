import { signIn } from "next-auth/client";
import { Text } from "@chakra-ui/core";
import { Link } from "components/link";
import { PageTitle } from "./page-title";

export default function AccessDenied() {
  return (
    <>
      <PageTitle>Access Denied</PageTitle>
      <Text>
        <Link
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </Link>
      </Text>
    </>
  );
}
