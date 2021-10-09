import request from "supertest";

import "dotenv/config";

import App from "../app";
import EventsController from "../events/events.controllers";
import { connectDatabase, clearDatabase, closeDatabase } from "../config/db";

beforeAll(async () => await connectDatabase());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("event api", () => {
  it("POST /events --> created event successfully", () => {
    const event = {
      firstName: "Grażyna",
      lastName: "Nowak",
      email: "test123@email.com",
      date: "0122-12-31T22:36:00.000Z",
    };
    const eventsController = new EventsController();
    const app = new App([eventsController]);

    return request(app.getServer())
      .post("/events")
      .expect("Content-Type", /json/)
      .send(event)
      .expect(201)
      .expect((res) => {
        res.body.firstName = "Grażyna";
        res.body.lastName = "Nowak";
        res.body.email = "test123@email.com";
        res.body.date = "0122-12-31T22:36:00.000Z";
      });
  });

  it("POST /events --> validate first name", () => {
    const eventWithoutFirstName = {
      lastName: "Nowak",
      email: "test123@email.com",
      date: "0122-12-31T22:36:00.000Z",
    };
    const eventsController = new EventsController();
    const app = new App([eventsController]);

    return request(app.getServer())
      .post("/events")
      .expect("Content-Type", /json/)
      .send(eventWithoutFirstName)
      .expect(422)
      .expect((res) => {
        expect(JSON.parse(res.text)).toStrictEqual({
          errors: [
            {
              msg: "First name doesn't exists",
              param: "firstName",
              location: "body",
            },
          ],
        });
      });
  });

  it("POST /events --> validate last name", () => {
    const eventWithoutLastName = {
      firstName: "Grażyna",
      email: "test123@email.com",
      date: "0122-12-31T22:36:00.000Z",
    };
    const eventsController = new EventsController();
    const app = new App([eventsController]);

    return request(app.getServer())
      .post("/events")
      .expect("Content-Type", /json/)
      .send(eventWithoutLastName)
      .expect(422)
      .expect((res) => {
        expect(JSON.parse(res.text)).toStrictEqual({
          errors: [
            {
              msg: "Last name doesn't exists",
              param: "lastName",
              location: "body",
            },
          ],
        });
      });
  });

  it("POST /events --> validate email", () => {
    const eventWithWrongEmail = {
      lastName: "Nowak",
      firstName: "Grażyna",
      email: "test123",
      date: "0122-12-31T22:36:00.000Z",
    };
    const eventsController = new EventsController();
    const app = new App([eventsController]);

    return request(app.getServer())
      .post("/events")
      .expect("Content-Type", /json/)
      .send(eventWithWrongEmail)
      .expect(422)
      .expect((res) => {
        expect(JSON.parse(res.text)).toStrictEqual({
          errors: [
            {
              msg: "Invalid email",
              param: "email",
              location: "body",
              value: "test123",
            },
          ],
        });
      });
  });

  it("POST /events --> validate date", () => {
    const eventWithWrongEmail = {
      lastName: "Nowak",
      firstName: "Grażyna",
      email: "test123@email.com",
      date: false,
    };
    const eventsController = new EventsController();
    const app = new App([eventsController]);

    return request(app.getServer())
      .post("/events")
      .expect("Content-Type", /json/)
      .send(eventWithWrongEmail)
      .expect(422)
      .expect((res) => {
        expect(JSON.parse(res.text)).toStrictEqual({
          errors: [
            {
              msg: "Invalid date",
              param: "date",
              location: "body",
              value: false,
            },
          ],
        });
      });
  });
});
