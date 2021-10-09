import React from "react";
import { DateTime } from "luxon";
import { observer } from "mobx-react-lite";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: "100%",
    },
    spacing: {
      padding: theme.spacing(2),
    },
  })
);

interface Props {
  date: DateTime | null;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
}

const EventDatePicker = ({ date, onDateChange, error }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.spacing}>
      <TextField
        id="date-picker"
        label="Event date*"
        type="date"
        data-testid="event-date-picker"
        value={!!date?.day ? date.toFormat("yyyy-MM-dd") : ""}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={onDateChange}
        error={error}
        helperText={error ? "Required" : undefined}
      />
    </div>
  );
};
export default observer(EventDatePicker);
