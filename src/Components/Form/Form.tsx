import React, { useState, useContext } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import { TasksContext } from "Context/TasksContext";
import useTasksLoading from "../TasksList/hooks/useTasksLoading";

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
  const [mode, setMode] = useState("add");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { tasks, addTask, toBEditedTaskID } = useContext(
    TasksContext
  );
  const reset = () => {
    setMode("add");
    setTitle("");
    setDescription("");
  };
  useTasksLoading();
  if (toBEditedTaskID && mode === "add" && tasks.length > 0) {
    setMode("edit");
    const toBEditedTaskObject = tasks.filter(
      (e) => +e.id === +toBEditedTaskID
    )[0];
    setTitle(toBEditedTaskObject.name);
    setDescription(toBEditedTaskObject.description);
  }
  const AddOrSaveTask = () => {
      title && description && addTask(title, description);
    reset();
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
