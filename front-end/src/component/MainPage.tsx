import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { observer } from "mobx-react-lite";

import Form from "./Form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      color: "#61dafb",
    },
  })
);

const MainPage: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" className={classes.title}>
        Add your new event!
      </Typography>
      <Form />
    </>
  );
};

export default observer(MainPage);
