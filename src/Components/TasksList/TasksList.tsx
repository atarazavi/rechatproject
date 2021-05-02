import React, { useContext, useState, useEffect } from "react";
import Task from "../Task/Task";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Skeleton from "@material-ui/lab/Skeleton";
import { TasksContext } from "Context/TasksContext";
import useTasksLoading from "./hooks/useTasksLoading";
import CloseIcon from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    logContainer: {
      margin: theme.spacing(2),
      position: "relative",
      width: "100%",
    },
    closeFab: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  })
);

export default function TasksList() {
  const classes = useStyles();
  const [logMode, setLogMode] = useState(false);
  const [toBloggedID, setToBloggedID] = useState<null | number>(null);
  const { tasks, isLoading, apiError, logs, fetchLogs } = useContext(TasksContext);
  useTasksLoading();
  useEffect(() => {
    fetchLogs()
  }, [fetchLogs, toBloggedID])
  if (apiError)
    return (
      <div className={classes.root}>
        <Alert severity="error">
          Oops! Something went wrong : {apiError} — call Administrative
          department!
        </Alert>
      </div>
    );

  if (isLoading && tasks.length < 1)
    return (
      <React.Fragment>
        <LinearProgress />
        <Grid container spacing={3} style={{ backgroundColor: "#F8F8F3" }}>
          {Array.from(new Array(4)).map((each, index) => (
            <Grid key={index} item xs={12} sm={6}>
              <Skeleton variant="rect" width={210} height={118} />
              <Skeleton />
              <Skeleton width="60%" />
            </Grid>
          ))}
        </Grid>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      {isLoading && <LinearProgress />}
      <Grid
        container
        spacing={3}
        style={
          tasks.length > 0
            ? { backgroundColor: "#F8F8F3" }
            : {
                backgroundColor: "#F8F8F3",
                justifyContent: "center",
                textAlign: "center",
              }
        }
      >
        {logMode && toBloggedID ? (
          <div className={classes.logContainer}>
            {logs
              ?.filter((log) => +log.relatedTaskID === +toBloggedID)
              .map((eachRelatedLog) => (
                <div key={eachRelatedLog.id}>
                  <Typography variant="body1" gutterBottom>
                    log type: {eachRelatedLog.type}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    log time: {eachRelatedLog.createdAt.toString()}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    log details (before and after): <br />
                    {eachRelatedLog.before}
                    <br />
                    {eachRelatedLog.after}
                  </Typography>
                  <hr />
                </div>
              ))}
            <Fab
              size="medium"
              className={classes.closeFab}
              color="secondary"
              aria-label="Close"
              onClick={() => {
                setLogMode(false);
                setToBloggedID(null);
              }}
            >
              <CloseIcon />
            </Fab>
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item key={task.id} xs={12} sm={6}>
              <Task
                task={task}
                setLogMode={setLogMode}
                setToBloggedID={setToBloggedID}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" gutterBottom>
            You have Nothing to do! <br /> Go get some sleep
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}
