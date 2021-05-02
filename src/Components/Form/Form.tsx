import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(2),
      },
    },
    mt10: {
      marginTop: 10,
    },
  })
);

export default function Form() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const AddOrSaveTask = () => {
    return null;
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="Title-task"
          inputProps={{ "data-testid": "titleInput" }}
          fullWidth
          value={title}
          label="Title"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div>
        <TextField
          id="Title-description"
          multiline
          inputProps={{ "data-testid": "descriptionInput" }}
          rowsMax={10}
          fullWidth
          value={description}
          label="Description"
          variant="outlined"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div>
        <Button
          variant="contained"
          onClick={AddOrSaveTask}
          fullWidth
          color="primary"
          size="large"
          startIcon={<AddIcon />}
        >
        </Button>
      </div>
    </form>
  );
}
