import { values } from "mobx";
import { observer } from "mobx-react-lite";
import { getSession, useSession } from "next-auth/client";
import { isServer } from "utils/isServer";
import Layout from "components/layout";
import AccessDenied from "components/access-denied";
import { useRouter } from "next/router";
import { ProfileForm } from "components/profile-form";
import { useEffect, useState } from "react";
import { useStore } from "tree";
import { Button, Icon, Spinner, useColorMode, useTheme } from "@chakra-ui/core";
import { PageSubTitle, PageTitle } from "components/page-title";

export default observer((props) => {
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
  const profileSlug = router.query.slug[0];
  const action = router.query.slug[1];

  if (!isServer && action && action !== "edit") {
    router.push("/profiles/[...slug]", `/profiles/${profileSlug}`);
    return null;
  }

  const { profileType } = useStore();

  useEffect(() => {
    const selectProfile = async () => {
      await profileType.selectProfile(profileSlug);
    };

    selectProfile();
  }, [action]);

  const selectedProfile = profileType.selectedProfile;

  if (!profileType.store.isLoading && profileType.store.isEmpty)
    return <Layout>The application doesn't have any profile</Layout>;
  if (selectedProfile === null) return <Layout>Profile not found</Layout>;

  if (action === "edit") {
    return (
      <Layout>
        {!!selectedProfile ? (
          <>
            <PageTitle>
              {`Modification de la fiche de ${selectedProfile.firstname} ${selectedProfile.lastname}`}
            </PageTitle>
            <ProfileForm profile={selectedProfile} />
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    );
  } else {
    const editAction = () => {
      router.push(
        "/profiles/[...slug]",
        `/profiles/${selectedProfile.slug}/edit`
      );
    };
    const removeAction = async () => {
      const removedProfile = await selectedProfile.remove();
      router.push("/profiles");
    };

    return (
      <Layout>
        {!!selectedProfile ? (
          <>
            <PageTitle>
              {`Fiche de ${selectedProfile.firstname} ${selectedProfile.lastname}`}
              <Button mx={5} border="1px" onClick={editAction}>
                Modifier
              </Button>
              <Button border="1px" onClick={removeAction}>
                Supprimer
              </Button>
            </PageTitle>
          </>
        ) : (
          <Spinner />
        )}
      </Layout>
    );
  }
});

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
