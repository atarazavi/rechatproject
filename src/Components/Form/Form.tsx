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
import { possibleStatus } from "Status";
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
  const [status, setStatus] = useState("");
  const { tasks, addTask, toBEditedTaskID, editTask, editThisID } = useContext(
    TasksContext
  );
  const reset = () => {
    editThisID(null);
    setMode("add");
    setTitle("");
    setDescription("");
    setStatus("");
  };
  useTasksLoading();
  if (toBEditedTaskID && mode === "add" && tasks.length > 0) {
    setMode("edit");
    const toBEditedTaskObject = tasks.filter(
      (e) => +e.id === +toBEditedTaskID
    )[0];
    setTitle(toBEditedTaskObject.name);
    setDescription(toBEditedTaskObject.description);
    setStatus(toBEditedTaskObject.status);
  }
  const AddOrSaveTask = () => {
    if (mode === "add") {
      title && description && addTask(title, description);
    } else if (toBEditedTaskID && tasks) {
      title &&
        description &&
        editTask(+toBEditedTaskID, title, description, status);
    }
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
      <Collapse in={mode !== "add"}>
        <div>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="demo-status-select">
              Status
            </InputLabel>
            <Select
              labelId="demo-status-select"
              id="demo-status-select"
              inputProps={{ "data-testid": "status-select" }}
              value={status}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                setStatus(e.target.value as string);
              }}
              label="Age"
            >
              {possibleStatus[status]?.map((option: string) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Collapse>
      <div>
        <Button
          variant="contained"
          onClick={AddOrSaveTask}
          fullWidth
          color="primary"
          size="large"
          startIcon={mode === "add" ? <AddIcon /> : <EditIcon />}
        >
          {mode === "add" ? `Add` : `Save`}
        </Button>
        {mode !== "add" && (
          <Button
            className={classes.mt10}
            onClick={reset}
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<CloseIcon />}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
