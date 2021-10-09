import { observer } from "mobx-react-lite";
import { TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      padding: theme.spacing(2),
    },
  })
);

interface TextInputProps {
  value: string;
  hasError: boolean;
  label: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  placeholder: string;
}

const TextInput = ({
  label,
  hasError,
  onChange,
  value,
  errorMessage,
  placeholder,
}: TextInputProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TextField
        placeholder={placeholder}
        data-testid={`text-input-${label}`}
        type="text"
        value={value}
        error={hasError}
        label={label}
        helperText={errorMessage}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default observer(TextInput);
