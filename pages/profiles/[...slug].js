import { getSession, useSession } from "next-auth/client";
import { isServer } from "utils/isServer";
import Layout from "components/layout";
import AccessDenied from "components/access-denied";
import { useRouter } from "next/router";
import { ProfileForm } from "components/profile-form";
import { useEffect, useState } from "react";
import { useStore } from "tree";
import { Button, Spinner, useColorMode, useTheme } from "@chakra-ui/core";
import { PageSubTitle, PageTitle } from "components/page-title";

export default function Page(props) {
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
  const profile = profileType.selectedProfile;

  useEffect(() => {
    const selectProfile = async () => {
      await profileType.selectProfile(profileSlug);
    };
    selectProfile();
  }, [action]);

  if (profileType.store.isLoading)
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  if (profileType.store.isEmpty) return <Layout>No profiles</Layout>;
  if (profile === null) return <Layout>Profile not found</Layout>;

  if (action === "edit") {
    return (
      <Layout>
        <ProfileForm profile={profile} />
      </Layout>
    );
  }

  const editAction = () => {
    router.push("/profiles/[...slug]", `/profiles/${profile.slug}/edit`);
  };
  const removeAction = async () => {
    const removedProfile = await profile.remove();
    router.push("/profiles");
  };

  return (
    <Layout>
      <PageTitle>
        {`Profile of ${profile.firstname} ${profile.lastname}`}
        <Button mx={5} border="1px" onClick={editAction}>
          Edit
        </Button>
        <Button border="1px" onClick={removeAction}>
          Remove
        </Button>
      </PageTitle>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
