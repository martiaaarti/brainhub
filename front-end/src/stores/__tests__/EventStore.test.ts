import { DateTime } from "luxon";
import nock from "nock";
import * as R from "ramda";

import { EventStore, EventStoreInstance } from "../EventStore";

const { REACT_APP_BASE_URL } = process.env;

const eventFixture = {
  lastName: "Kowalska",
  email: "test123@gmail.com",
  firstName: "Grażyna",
  date: "2021-06-01T00:00:00.000+02:00",
};

describe("EventStore", () => {
  it("can create an instance", () => {
    const store = EventStore.create({
      email: "test123@gmail.com",
      firstName: "Grażyna",
      lastName: "Nowak",
      date: null,
    });

    expect(store).toMatchSnapshot();
  });
  describe("actions", () => {
    let store: EventStoreInstance;
    beforeEach(() => {
      store = EventStore.create();
    });

    it("first name can be set", () => {
      expect(store.firstName).toBe("");
      store.setFirstName("Grażyna");
      expect(store.firstName).toBe("Grażyna");
    });

    it("last name can be set", () => {
      expect(store.lastName).toBe("");
      store.setLastName("Nowak");
      expect(store.lastName).toBe("Nowak");
    });

    it("email can be set", () => {
      expect(store.email).toBe("");
      store.setEmail("test123@gmail.com");
      expect(store.email).toBe("test123@gmail.com");
    });

    it("date can be set", () => {
      const date = DateTime.local(2021, 6, 1);
      store.setDate(date);
      expect(store.date).toMatchSnapshot();
    });
  });

  describe("api actions", () => {
    it("can succesfully create an event", async () => {
      const store = EventStore.create(eventFixture);

      store.setLastName("Kowalska");

      const mockPostRequest = nock(
        REACT_APP_BASE_URL || "http://localhost:5000"
      )
        .post("/events", (body) => R.equals(body, eventFixture))
        .reply(
          200,
          {},
          {
            "Access-Control-Allow-Origin": "*",
          }
        );

      await store.createEvent();
      expect(mockPostRequest.isDone()).toBe(true);
    });
  });
});
