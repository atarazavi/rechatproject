import React from "react";
import Form from "Components/Form/Form";
import TasksList from "Components/TasksList/TasksList";
import Container from "@material-ui/core/Container";
import logo from "./Resources/assets/rechat.png";
import "App.css";

function App() {
  return (
    <Container maxWidth="md" style={{ backgroundColor: "#fff" }}>
      <div className="logoContainer">
        <img className="headerLogo" src={logo} alt="logo-Rechat" />
      </div>
      <Form />
      <br />
      <TasksList />
      <br />
    </Container>
  );
}

export default App;
