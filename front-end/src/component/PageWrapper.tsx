import React, { useMemo } from "react";
import { observer } from "mobx-react-lite";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { EventContextProvider } from "./EventContext";
import { EventStore } from "../stores/EventStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "#282c34",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
    title: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      color: "#61dafb",
    },
  })
);

const PageWrapper: React.FC = ({ children }) => {
  const eventStore = useMemo(() => EventStore.create(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EventContextProvider eventStore={eventStore}>
        {children}
      </EventContextProvider>
    </div>
  );
};

export default observer(PageWrapper);
