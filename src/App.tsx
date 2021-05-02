import React from 'react';
import Form from 'Components/Form/Form';
import TasksList from 'Components/TasksList/TasksList';
import 'App.css';

function App() {
  return (
    <div className="App">
      <Form />
      <br />
      <TasksList />
    </div>
  );
}

export default App;
