import { cleanup, fireEvent, render } from "@testing-library/react";
import { DateTime } from "luxon";
import nock from "nock";
import * as R from "ramda";

import { EventStore } from "../../stores/EventStore";
import { EventContextProvider } from "../EventContext";
import MainPage from "../MainPage";

const { REACT_APP_BASE_URL } = process.env;

export const renderMainPage = (withEmail?: boolean) => {
  const eventStore = EventStore.create({
    email: withEmail ? "test123@gmail.com" : undefined,
  });

  const rendered = render(
    <EventContextProvider eventStore={eventStore}>
      <MainPage />
    </EventContextProvider>
  );

  const checkIfIsVisible = (text: string) =>
    expect(rendered.getByText(text)).toBeVisible();

  const assert = {
    debug: () => rendered.debug(),
    inputValue: {
      isVisible: (value: string) => rendered.getAllByDisplayValue(value),
    },
    title: {
      isVisible: () => checkIfIsVisible("Add your new event!"),
    },
    firstNameInput: {
      isVisible: () => checkIfIsVisible("First name*"),
    },
    lastNameInput: {
      isVisible: () => checkIfIsVisible("Last name*"),
    },
    emailInput: {
      isVisible: () => checkIfIsVisible("Email*"),
    },
    dateInput: {
      isVisible: () => checkIfIsVisible("Event date*"),
    },
    addEventButton: {
      isVisible: () => checkIfIsVisible("Add event"),
      isDisabled: () =>
        expect(rendered.getByTestId("add-event-btn")).toBeDisabled(),
      isNotDisabled: () =>
        expect(rendered.getByTestId("add-event-btn")).not.toBeDisabled(),
    },
    errorMessage: {
      isVisible: (message: string) => checkIfIsVisible(message),
    },
    snackBar: {
      isVisible: async () =>
        expect(
          await rendered.findByText("Your event has been added!")
        ).toBeVisible(),
    },
  };

  const act = {
    type: (text: string, newValue: string) => {
      const input = rendered.getByPlaceholderText(text);
      fireEvent.change(input, { target: { value: newValue } });
    },
    changeDate: () => {
      const input = rendered
        .getByTestId("event-date-picker")
        .getElementsByTagName("input")[0];
      const newDate = DateTime.local(2021, 6, 1).toFormat("yyyy-MM-dd");
      fireEvent.change(input, { target: { value: newDate } });
    },
    addEvent: {
      click: () => fireEvent.click(rendered.getByText("Add event")),
    },
  };

  return { ...rendered, act, assert };
};

describe("MainPage", () => {
  afterEach(cleanup);
  it("should display correct title, button and inputs", () => {
    const { assert } = renderMainPage();

    assert.title.isVisible();
    assert.firstNameInput.isVisible();
    assert.lastNameInput.isVisible();
    assert.emailInput.isVisible();
    assert.dateInput.isVisible();
    assert.addEventButton.isVisible();
    assert.addEventButton.isDisabled();
  });

  it.each`
    inputName       | placeholder           | newValue
    ${"first name"} | ${"Enter first name"} | ${"Grażyna"}
    ${"last name"}  | ${"Enter last name"}  | ${"Nowak"}
    ${"email"}      | ${"Enter email"}      | ${"test123@gmail.com"}
  `("$inputName can be set", ({ placeholder, newValue }) => {
    const { assert, act } = renderMainPage();
    act.type(placeholder, newValue);
    assert.inputValue.isVisible(newValue);
  });

  it("can set a date", () => {
    const { assert, act } = renderMainPage();

    act.changeDate();
    assert.inputValue.isVisible("2021-06-01");
  });

  it("add event button become active when all inputs are filed", () => {
    const { assert, act } = renderMainPage();

    assert.addEventButton.isDisabled();
    act.type("Enter first name", "Grażyna");
    act.type("Enter last name", "Nowak");
    act.type("Enter email", "test123@gmail.com");
    act.changeDate();
    assert.addEventButton.isNotDisabled();
  });

  describe("input", () => {
    it("shows appropriate error message if input is empty", () => {
      const { assert, act } = renderMainPage(true);
      act.type("Enter email", "");
      assert.errorMessage.isVisible("Required");
    });

    it("shows appropriate error message if email in invalid", () => {
      const { assert, act } = renderMainPage(true);
      act.type("Enter email", "test123");
      assert.errorMessage.isVisible("Invalid email adderss");
    });
  });

  it("user can fill the form and add the event", async () => {
    const { assert, act } = renderMainPage();
    const bodyToPass = {
      firstName: "Grażyna",
      lastName: "Nowak",
      email: "test123@gmail.com",
      date: "2021-06-01T00:00:00.000+02:00",
    };

    act.type("Enter first name", "Grażyna");
    act.type("Enter last name", "Nowak");
    act.type("Enter email", "test123@gmail.com");
    act.changeDate();

    nock(REACT_APP_BASE_URL || "http://localhost:5000")
      .post("/events", (body) => R.equals(body, bodyToPass))
      .reply(
        200,
        {},
        {
          "Access-Control-Allow-Origin": "*",
        }
      );

    act.addEvent.click();

    await assert.snackBar.isVisible();
  });
});
