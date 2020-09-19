// This is an example of how to protect content using server rendering
import { useObserver, observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { initializeStore, Tree, useStore } from "tree";
import { getSession } from "next-auth/client";
import AccessDenied from "components/access-denied";
import Layout from "components/layout";
import { Button } from "@chakra-ui/core";

const Counter = observer(() => {
  const { counter } = useStore();

  return (
    <div className="mt-20 flex flex-col items-center">
      <p className="font-bold text-2xl text-center">Counter</p>
      <p
        style={{ fontVariant: "tabular-nums" }}
        className="font-bold text-2xl text-center"
      >
        {counter.count}
      </p>
      <div className="mt-2 flex-row">
        <Button label="-" onClick={counter.decrement}>
          -
        </Button>
        <Button className="ml-2" label="+" onClick={counter.increment}>
          +
        </Button>
      </div>
    </div>
  );
});

export default function Page({ content, session }) {
  // // If no session exists, display access denied message
  // if (!session) {
  //   return (
  //     <Layout>
  //       <AccessDenied />
  //     </Layout>
  //   );
  // }

  // // If session exists, display content
  // return (
  //   <Layout>
  //     <h1>Protected Page</h1>
  //     <p>
  //       <strong>{content}</strong>
  //     </p>
  //   </Layout>
  // );

  return (
    <Layout>
      <Counter />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const session = await getSession(context);

  // let content = null;

  // if (session) {
  //   const hostname = process.env.NEXTAUTH_URL || "http://localhost:3000";
  //   const options = { headers: { cookie: context.req.headers.cookie } };
  //   const res = await fetch(`${hostname}/api/examples/protected`, options);
  //   const json = await res.json();
  //   if (json.content) {
  //     content = json.content;
  //   }
  // }

  const store = initializeStore({ counter: { count: 1 } });
  const snapshot = getSnapshot(store);

  return {
    props: {
      snapshot,
      // session,
      // content,
    },
  };
}
