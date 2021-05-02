import React from "react";
import Form from "Components/Form/Form";
import TasksList from "Components/TasksList/TasksList";
import Container from "@material-ui/core/Container";
import logo from "./Resources/assets/rechat.png";
import "App.css";
import { TasksContext } from "Context/TasksContext";
import useTasksContextValue from "Context/useTasksContextValue";

function App() {
  const tasksContextValue = useTasksContextValue();
  return (
    <TasksContext.Provider value={tasksContextValue}>
      <Container maxWidth="md" style={{ backgroundColor: "#fff" }}>
        <div className="logoContainer">
          <img className="headerLogo" src={logo} alt="logo-Rechat" />
        </div>
        <Form />
        <br />
        <TasksList />
        <br />
      </Container>
    </TasksContext.Provider>
  );
}

export default App;
