import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Skeleton from "@material-ui/lab/Skeleton";
import Task from "../Task/Task"



export default function TasksList() {
  const [logMode, setLogMode] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [tasks, setTasks] = useState([{id:1, name: '1'}, {id:2, name: '2'}]);

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
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item key={task.id} xs={12} sm={6}>
              <Task task={task}></Task>
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
