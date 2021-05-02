import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";

interface taskProps {
  task: { id: number; name: string };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        position: "absolute",
        right: theme.spacing(1),
        bottom: theme.spacing(1),
      },
    },
    logFab: {
      right: theme.spacing(7),
    },
    taskContainer: {
      position: "relative",
      minHeight: 150,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    statusElement: {
      position: "absolute",
      left: theme.spacing(0),
      bottom: theme.spacing(0),
      color: "#000!important",
    },
  })
);

const Task: React.FC<taskProps> = ({ task }) => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid
            item
            container
            direction="column"
            spacing={2}
            className={classes.taskContainer}
          >
            <Grid item xs>
              <Typography noWrap gutterBottom variant="h5" component="h2">
                {task.name}
              </Typography>
              <Typography
                noWrap
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {task.name}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                disabled
                disableElevation
                className={classes.statusElement}
                variant="contained"
              >
                {task.name}
              </Button>
            </Grid>
            <div className={classes.root}>
              <Fab
                onClick={() => console.log("0")}
                color="secondary"
                size="small"
              >
                <EditIcon />
              </Fab>
              <Fab
                size="small"
                className={classes.logFab}
                onClick={() => console.log("1")}
              >
                <AssignmentIcon />
              </Fab>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Task;
