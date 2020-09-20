import { types as t, flow, getParent, destroy } from "mobx-state-tree";
import api from "utils/api";

const ProfileModel = t
  .model("ProfileModel", {
    _id: t.string,
    slug: t.string,
    firstname: t.string,
    lastname: t.string,
    birthdate: t.Date,
  })
  .actions((profile) => ({
    remove: function remove() {
      getParent(profile, 2).removeProfile(profile);
    },
  }));

const ProfileStore = t
  .model("ProfileStore", {
    profiles: t.optional(t.map(ProfileModel), {}),
    state: t.optional(t.enumeration(["pending", "done", "error"]), "pending"),
  })
  .views((store) => ({
    get isEmpty() {
      return store.profiles.size === 0;
    },
    get isLoading() {
      return store.state === "pending";
    },
  }))
  .actions((store) => ({
    setProfiles(data) {
      const profiles = {};
      data.forEach(({ _id, firstname, lastname, birthdate, ...attrs }) => {
        profiles[_id] = ProfileModel.create({
          _id,
          slug: `${firstname}-${lastname}`,
          firstname,
          lastname,
          birthdate: new Date(birthdate),
          ...attrs,
        });
      });
      store.profiles = profiles;
    },
    fetch: flow(function* fetchList() {
      store.state = "pending";
      try {
        const { data } = yield api.get("profiles");
        store.setProfiles(data);
        store.state = "done";
      } catch (error) {
        store.state = "error";
        console.error(error);
      }
    }),
    addProfile: flow(function* addProfile(data) {
      try {
        return yield api.post("profiles", data);
      } catch (error) {
        console.error(error);
      }
    }),
    setProfile: flow(function* setProfile(data) {
      store.state = "pending";
      const res = yield api.update(`profiles/${data._id}`, data);
      store.state = "done";
      return res;
    }),
    removeProfile: flow(function* removeProfile(profile) {
      // destroy(profile);
      store.state = "pending";
      const res = yield api.remove(`profiles/${profile._id}`);
      store.state = "done";
      return res;
    }),
  }));

export const ProfileType = t
  .model("ProfileType", {
    store: t.optional(ProfileStore, {}),
    selectedProfile: t.maybeNull(t.reference(ProfileModel)),
  })
  .actions((self) => ({
    selectProfile: flow(function* selectProfile(slug) {
      yield self.store.fetch();
      self.store.profiles.forEach((profile) => {
        if (slug === profile.slug) {
          self.selectedProfile = profile;
        }
      });
    }),
  }));
