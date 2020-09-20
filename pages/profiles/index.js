import { getSession, useSession } from "next-auth/client";
import { isServer } from "utils/isServer";
import { Button, Box, useTheme, useColorMode, Spinner } from "@chakra-ui/core";
import Layout from "components/layout";
import AccessDenied from "components/access-denied";
import { Link } from "components/link";
import { PageTitle } from "components/page-title";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore } from "tree";
import { StyledTable as Table } from "components/table";
import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { values } from "mobx";

const Page = (props) => {
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [session = props.session, loading] = useSession();

  if (loading && !isServer) return null;
  if (!session)
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );

  const router = useRouter();
  const {
    profile: {
      store: { profiles, fetch, isLoading, isEmpty },
    },
  } = useStore();

  useEffect(() => {
    const fetchProfiles = async () => {
      await fetch();
    };
    fetchProfiles();
  }, []);

  if (isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );

  return (
    <Layout>
      <PageTitle>
        Profiles
        <Link href="/profiles/add">
          <Button ml={5} border="1px">
            Add
          </Button>
        </Link>
      </PageTitle>
      {!isEmpty && (
        <Table bg={theme[colorMode].hover.bg}>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Birthdate</th>
            </tr>
          </thead>
          <tbody>
            {values(profiles).map((profile) => {
              return (
                <tr
                  key={profile._id}
                  tabIndex={0}
                  title={`Click to open the profile for ${profile.firstname} ${profile.lastname}`}
                  onClick={() =>
                    router.push(
                      "/profiles/[...slug]",
                      `/profiles/${profile.slug}`
                    )
                  }
                >
                  <td>{profile.firstname}</td>
                  <td>{profile.lastname}</td>
                  <td>{format(profile.birthdate, "dd/MM/yyyy")}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default observer(Page);
