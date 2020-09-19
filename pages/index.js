import { getSession } from "next-auth/client";
import Layout from "components/layout";

export default function Page({ session }) {
  if (!session) {
    return <Layout>Welcome to react-app-starter, please login</Layout>;
  }

  return <Layout>Welcome {session.user.name}</Layout>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
