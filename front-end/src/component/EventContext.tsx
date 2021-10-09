import React, { useMemo, useContext } from "react";

import { EventStoreInstance, EventStore } from "../stores/EventStore";

export interface EventContextProps {
  eventStore: EventStoreInstance;
}

const EventContext = React.createContext<EventContextProps | undefined>(
  undefined
);

const EventContextProvider: React.FC<Partial<EventContextProps>> = ({
  children,
  eventStore,
}) => {
  const event = useMemo(
    () => (eventStore ? eventStore : EventStore.create()),
    [eventStore]
  );

  return (
    <EventContext.Provider value={{ eventStore: event }}>
      {children}
    </EventContext.Provider>
  );
};

const useEventContext = () => {
  const context = useContext(EventContext);

  if (context === undefined) {
    throw new Error("useEventContext must be within a EventContextProvider");
  }

  return context;
};

export { EventContextProvider, useEventContext };
