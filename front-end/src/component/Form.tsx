import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
  IconButton,
  SnackbarContent,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import { observer } from "mobx-react-lite";
import axios, { AxiosError } from "axios";

import { useEventContext } from "./EventContext";
import FormContent from "./FormContent";
import { ServerError } from "../stores/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 500,
    },
    button: {
      marginBottom: theme.spacing(),
      backgroundColor: "#282c34",
      color: "#61dafb",
      float: "right",
      "&:hover": {
        backgroundColor: "#3E4451",
      },
    },
    footer: {
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
    snackbar: {
      background: "#61dafb",
    },
    snackbarContent: {
      color: "#282c34",
    },
  })
);

const Form: React.FC = () => {
  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {
    eventStore: { email, firstName, lastName, date, createEvent, reset },
  } = useEventContext();

  const onAddEventHandler = async () => {
    try {
      await createEvent();
      setSnackbarMessage("Your event has been added!");
      setIsSnackbarOpen(true);
      reset();
    } catch (error) {
      setSnackbarMessage("Ooops, something went wrong. Please, try later.");
      setIsSnackbarOpen(true);
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError && serverError.response) {
          console.error(serverError.response.data);
        }
      }
    }
  };

  const buttonEnabled =
    Boolean(email) &&
    Boolean(firstName) &&
    Boolean(lastName) &&
    Boolean(date?.day);

  return (
    <>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <FormContent />
        </CardContent>
        <div className={classes.footer}>
          <Button
            onClick={onAddEventHandler}
            data-testid="add-event-btn"
            variant="contained"
            className={classes.button}
            disabled={!buttonEnabled}
          >
            Add event
          </Button>
          <Typography variant="subtitle2">*Field required</Typography>
        </div>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
      >
        <SnackbarContent
          classes={{
            root: classes.snackbar,
            message: classes.snackbarContent,
          }}
          message={
            <Typography variant="body1" component="div">
              {snackbarMessage}
            </Typography>
          }
          action={
            <IconButton
              size="small"
              aria-label="close"
              onClick={() => setIsSnackbarOpen(false)}
            >
              <CloseIcon
                fontSize="small"
                classes={{ root: classes.snackbarContent }}
              />
            </IconButton>
          }
        />
      </Snackbar>
    </>
  );
};

export default observer(Form);
