import { getSession, useSession } from "next-auth/client";
// import { DevTool } from "@hookform/devtools";
import Layout from "components/layout";
import AccessDenied from "components/access-denied";
import { isServer } from "utils/isServer";
import { PageTitle } from "components/page-title";
import { ProfileForm } from "components/profile-form";

export default function Page(props) {
  const [session = props.session, loading] = useSession();

  if (loading && !isServer) return null;

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <PageTitle>Add a new profile</PageTitle>
        <ProfileForm />
      </Layout>
      {/* <DevTool control={control} /> */}
    </>
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
