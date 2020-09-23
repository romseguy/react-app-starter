import { toDate } from "date-fns";
import {
  types as t,
  flow,
  getParent,
  destroy,
  getSnapshot,
} from "mobx-state-tree";
import api from "utils/api";

const ProfileModel = t
  .model("ProfileModel", {
    _id: t.identifier,
    firstname: t.string,
    lastname: t.string,
    birthdate: t.Date,
  })
  .views((profile) => ({
    get slug() {
      return `${profile.firstname}-${profile.lastname}`;
    },
  }))
  .actions((profile) => ({
    merge(formData) {
      profile.firstname = formData.firstname;
      profile.lastname = formData.lastname;
      profile.birthdate = formData.birthdate;
    },
    update() {
      return getParent(profile, 2).updateProfile(profile);
    },
    remove: function remove() {
      getParent(profile, 2).removeProfile(profile);
    },
  }));

const ProfileStore = t
  .model("ProfileStore", {
    profiles: t.map(ProfileModel),
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
      data.forEach(({ _id, firstname, lastname, birthdate }) => {
        profiles[_id] = ProfileModel.create({
          _id,
          firstname,
          lastname,
          birthdate: new Date(birthdate),
        });
      });
      store.profiles = profiles;
    },
    // API
    fetch: flow(function* fetch() {
      store.state = "pending";
      const { data } = yield api.get("profiles");
      store.setProfiles(data);
      store.state = "done";
    }),
    postProfile: flow(function* postProfile(data) {
      store.state = "pending";
      const res = yield api.post("profiles", data);
      store.state = "done";
      return res;
    }),
    updateProfile: flow(function* updateProfile(profile) {
      store.state = "pending";
      const data = getSnapshot(profile);
      const res = yield api.update(`profiles/${profile._id}`, {
        ...data,
        birthdate: toDate(data.birthdate),
      });
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
    selectedProfile: t.maybeNull(t.safeReference(ProfileModel)),
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
