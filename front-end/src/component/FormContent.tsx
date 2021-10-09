import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { DateTime } from "luxon";

import { useEventContext } from "./EventContext";
import TextInput from "./TextInput";
import EventDatePicker from "./EventDatePicker";

const EMAIL_REGEXP =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const validateString = (
  value: string,
  setErrorMessage: (error?: string) => void
) => {
  const newValue = value.trim();
  if (!newValue) {
    setErrorMessage("Required");
  } else {
    setErrorMessage(undefined);
  }
};

const FormContent: React.FC = () => {
  const {
    eventStore: {
      email,
      firstName,
      lastName,
      date,
      setEmail,
      setFirstName,
      setLastName,
      setDate,
    },
  } = useEventContext();
  const [firstNameError, setFirstNameError] = useState<string | undefined>(
    undefined
  );
  const [lastNameError, setLastNameError] = useState<string | undefined>(
    undefined
  );
  const [emailErrorMessage, setEmailErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [hasDate, setHasDate] = useState<boolean | undefined>(undefined);

  const onFirstNameChange = (value: string) => {
    setFirstName(value);
    validateString(value, setFirstNameError);
  };

  const onLastNameChange = (value: string) => {
    setLastName(value);
    validateString(value, setLastNameError);
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
    if (!value.trim()) {
      setEmailErrorMessage("Required");
    } else if (!EMAIL_REGEXP.test(value)) {
      setEmailErrorMessage("Invalid email adderss");
    } else {
      setEmailErrorMessage(undefined);
    }
  };

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setDate(null);
      setHasDate(false);
    } else {
      setDate(DateTime.fromISO(event.target.value));
      setHasDate(true);
    }
  };

  return (
    <>
      <TextInput
        label="First name*"
        placeholder="Enter first name"
        value={firstName}
        hasError={Boolean(firstNameError)}
        onChange={onFirstNameChange}
        errorMessage={firstNameError}
      />
      <TextInput
        label="Last name*"
        placeholder="Enter last name"
        value={lastName}
        hasError={Boolean(lastNameError)}
        errorMessage={lastNameError}
        onChange={onLastNameChange}
      />
      <TextInput
        label="Email*"
        placeholder="Enter email"
        value={email}
        hasError={Boolean(emailErrorMessage)}
        onChange={onEmailChange}
        errorMessage={emailErrorMessage}
      />
      <EventDatePicker
        date={date}
        onDateChange={onDateChange}
        error={hasDate === false}
      />
    </>
  );
};

export default observer(FormContent);
