import axios from "axios";
import { DateTime } from "luxon";
import {
  types,
  Instance,
  SnapshotIn,
  flow,
  getSnapshot,
  applySnapshot,
} from "mobx-state-tree";

import { LuxonDateTimeOrNull } from "./types";

export const EventStore = types
  .model("EventStore", {
    firstName: types.optional(types.string, ""),
    lastName: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    date: types.maybeNull(LuxonDateTimeOrNull),
  })
  .actions((self) => ({
    setFirstName(newFirstName: string) {
      self.firstName = newFirstName;
    },
    setLastName(newLastName: string) {
      self.lastName = newLastName;
    },
    setEmail(newEmail: string) {
      self.email = newEmail;
    },
    setDate(newDate: DateTime | null) {
      self.date = newDate;
    },
  }))
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      reset: () => {
        applySnapshot(self, initialState);
      },
    };
  })
  .actions((self) => ({
    createEvent: flow(function* createEvent() {
      const data = {
        firstName: self.firstName,
        lastName: self.lastName,
        email: self.email,
        date: self.date,
      };
      yield axios({
        method: "post",
        url: "/events",
        baseURL: process.env.REACT_APP_BASE_URL,
        data,
      });
    }),
  }));

export interface EventStoreInstance extends Instance<typeof EventStore> {}
export interface EventStoreSnapshot extends SnapshotIn<typeof EventStore> {}
