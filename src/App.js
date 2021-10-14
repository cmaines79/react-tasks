// importing useState
import { useState } from 'react';

// importing components
import Overview from './components/Overview';
import Header from './components/Header'

// importing Stylesheet(s)
import './App.css';

function App() {
  // creating useState for the task Array
  const [tasks, setTasks] = useState([{'id': 1, text: "Sample Task 1"}, {'id': 2, text: "Sample Task 2"}, {'id': 3, text: "Sample Task 3"}]);

  // createing useState for the input
  const [text, setText] = useState(''); // default is an empty string

  // supporting funcitons
  const addTask = (text) => {
    const id = Math.floor(Math.random() * 10000 + 1 );
    const newTask = {id, text}
    setTasks([...tasks, newTask]);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!text) {
      alert('Please add a task');
      return
    }
    addTask(text);

    // clear the form
    setText('');
  }

  return (
    <div className="container">
      <Header />
      <form className="add-tasks" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="">Task:</label>
          <input type="text" name="" id="inputText" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task" />
          <input type="submit" value="Save Task" className="btn"/>
        </div>
      </form>
      <Overview tasks={tasks} />
    </div>
  );
}

export default App;
