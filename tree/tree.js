import { createContext, useContext } from "react";
import { applySnapshot, types as t } from "mobx-state-tree";
import makeInspectable from "mobx-devtools-mst";
import { Counter } from "./counter";
import { ProfileType } from "./profile";
import { isServer } from "utils/isServer";

let clientStore;

export const Tree = t
  .model({
    counter: t.optional(Counter, {}),
    profile: t.optional(ProfileType, {}),
  })
  .actions((tree) => ({
    reset() {
      Object.keys(tree).forEach((key) => {
        tree[key].reset && tree[key].reset();
      });
    },
  }));

export function initializeStore(snapshot = null) {
  const store = clientStore ?? makeInspectable(Tree.create({}));

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (isServer) return store;
  // Create the store once in the client
  if (!clientStore) clientStore = store;

  return clientStore;
}

const RootStoreContext = createContext(null);
export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
