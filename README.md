# The Odin Project - React Task List

## Do-It-Yourself Guide

Our application will be made of two components, **App** and **Overview**. Your application should render an input field and a submit button. With the submit button, you can add the content from your input to a “tasks array” that is managed in state. (We will use class components for this example because we haven’t introduced hooks in this section yet). Finally, for each task in the tasks array, an HTML list element should be rendered.

Run `npx create-react-app task-app`, cd into your project and open it. You can delete everything in the return statement of the App component and just return an empty div. You can also delete all of the boilerplate create-react-app provides and just leave index.js and App.js in the src directory. Just make sure to clean up the import statements and the serviceWorker in the two remaining files. If you aren’t familiar with what code or files we are referring to, go back to the first lesson of this section.
Create a components folder in your src directory and create a file for your component called **Overview.js**. **Overview.js** should just render our tasks, while **App.js** is going to handle the input field with the logic.
With the intended functionality explained, it’s your turn to implement this React app. You can do it. You are not required to style this assignment unless you wish to, the focus is on using event handlers and dealing with forms with state.
Quick tip: Use the **JavaScript function map** to map over your tasks array. You will need to provide a unique key to each item (read the warning, you’ll know it when you see it in the console!). And there is a difference between handling input fields in plain JavaScript and in React. If you face a problem with it, attempt to figure it out on your own using tools like the documentation, StackOverflow, Google, or experimenting. But fear not, we will again provide an overview of our solution below.

## My project Notes

First, let's look at the totality of our scrips. Then we'll break them up for closer inspection.

### App.js

```javascript
// importing useState
import { useState } from 'react';

// importing components
import Overview from './components/Overview';
import Header from './components/Header';

// importing Stylesheet(s)
import './App.css';

function App() {
  // creating useState for the task Array
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Sample Task 1' },
    { id: 2, text: 'Sample Task 2' },
    { id: 3, text: 'Sample Task 3' },
  ]);

  // createing useState for the input
  const [text, setText] = useState(''); // default is an empty string

  // supporting funcitons
  const addTask = (text) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newTask = { id, text };
    setTasks([...tasks, newTask]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert('Please add a task');
      return;
    }
    addTask(text);

    // clear the form
    setText('');
  };

  return (
    <div className="container">
      <Header />
      <form className="add-tasks" onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="">Task</label>
          <input
            type="text"
            name=""
            id=""
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task"
          />
          <input type="submit" value="Save Task" className="btn" />
        </div>
      </form>
      <Overview tasks={tasks} />
    </div>
  );
}

export default App;
```

### Overview.js

```javascript
const Overview = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <h3 key={tasks.id}>{tasks.text}</h3>
      ))}
    </>
  );
};

export default Overview;
```

### Let's dig into the smaller file first, Overview.js

Overview is a fairly simple js file. Here we are taking in all of the destructured props of tasks and maping over in order to display the list of them on the screen. Some key items to consider is the mapping funciton and the key.

We use a high-order array method to **map** over all of our items in a fragment.

```javascript
<>
  {tasks.map((task) => (
    <h3 key={tasks.id}>{tasks.text}</h3>
  ))}
</>
```

Remember, when creating lists in JSX, we need to pass the key along which is why the key is present in the h3 element. After that we are mering passing the text value of the tasks.

### Now, let's dig into the App.js file

Let's being by looking at the imports.

```javascript
// importing useState
import { useState } from 'react';

// importing components
import Overview from './components/Overview';
import Header from './components/Header';

// importing Stylesheet(s)
import './App.css';
```

We'll import the useState method from React along with our two components (note, only the Overview.js was required for this project). Lastly, we import our stylesheet.

I'm going to pass over our useStates for the moment and go directly to our main component.

```javascript
return (
  <div className="container">
    <Header />
    <form className="add-tasks" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input
          type="text"
          name=""
          id=""
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
        />
        <input type="submit" value="Save Task" className="btn" />
      </div>
    </form>
    <Overview tasks={tasks} />
  </div>
);
```

Ignore all of the classNames, these are only used for styling. Also ignore the `<Header />` we are just bringing in a component.

Okay, let's take a closer look at the form. Within the form we have a label, text input, and a submit button. The value of the text input is our **text useState** `value={text}`. We have also added and **eventListener** for **onChange**. This onChange event takes in one arguement, the event **e** and calls the **setText** useState to the value of the input box through the `e.target.value`. To boil this down to its simplist form for my dumb-ass, all this is really doing is setting a value for the **text** variable becuase we can't edit a piece of State directly.

The only other item of importance is the **onSubmit** `onSubmit={onSubmit}` prop in the form element. This onSubmit will call the onSubmit function. Note, we are not direclty calling the **addTask** function, which direclty updates the setTasks useState, as we need to be able to call a funciton to pass variables. Obviously, this function is called when we click the submit button duro the type of button `type="submit"`.

The last item in the main component is the insertion of the Overview Component `<Overview tasks={tasks}>`. And we are passing the tasks prop to it.

### useStates

We have two useStates; tasks and text. Ideally, these could have been given more descriptive names; I'll keep this in mind for the next project. Before we go any further, for my future reference, let's cover the structure of delcaring a useState. Of course we need to first import useState from react `import { useState } from 'react'`. Then we declare a useState by the following methodology `const[variableName, functionName] = useState[defaultValue]`. This is not the techical nomenclature for the strucutre, but it helps me remeber. Anyway, back to the strucutre; the variableName is the identifying variable that will be used to pass this item into props. By default, useStates are immutible; meaning we can't update them directly - so we need a function that provides us the ability to modify. This is where the functionName comes in. Lastly, we need a default value. While this default value is not required, I imagine we will use it quite a bit.

Nonetheless, the first State is tasks. The variable is **tasks**, the modification function is **setTasks**, and the default value is the array **[
{ id: 1, text: 'Sample Task 1' },
{ id: 2, text: 'Sample Task 2' },
{ id: 3, text: 'Sample Task 3' },
]**.

Where as the text State has the variable of **text**, the modification function of **setText**, and the default value is an empty string **''**..

```javascript
// creating useState for the task Array
const [tasks, setTasks] = useState([
  { id: 1, text: 'Sample Task 1' },
  { id: 2, text: 'Sample Task 2' },
  { id: 3, text: 'Sample Task 3' },
]);

// createing useState for the input
const [text, setText] = useState(''); // default is an empty string
```

### Functions

Our little app has two functions; **addTask** and **onSubmit**.

```javascript
// supporting funcitons
const addTask = (text) => {
  const id = Math.floor(Math.random() * 10000 + 1);
  const newTask = { id, text };
  setTasks([...tasks, newTask]);
};

const onSubmit = (e) => {
  e.preventDefault();
  if (!text) {
    alert('Please add a task');
    return;
  }
  addTask(text);

  // clear the form
  setText('');
};
```

**addTask()** is really the heart of our app. This function is responsible for updating our **tasks array**. We are creating an arrow function that takes in the text variable/state and creates a new task that is then added to our array. Keep in mind that this example app does not have a back end, so we are not making any permanent changes. Each time the browser is refreshed we will lose all of our changes.

Anyway, back to work, we begin with creating the id `const id = Math.floor(Math.random() * 10000 + 1);`. I know this is strange, but we need an integer to act as our id and we are doing so by getting a random number from 0 to 10,000. This will reduce the possibllity of duplicate id's. In retrospect, we could have calculated a .length() on the task array and just added one to it.

Next we create a **newTask** variable formatted to match our array with `const newTask = { id, text };`. And lastly, we modify the **tasks array** with `setTasks([...tasks, newTask]);`. I still don't fully understand how this works, but the `....tasks` means we are taking the exsisting array and adding the **newTask** to it.

Hey, we are almost done with this app. The last funciton to look at is the **onSubmit()**. If you recall, **onSubmit** is being fired by the action of the submit button. The first thing we are doing is preventing the default submission with `e.preventDefault()`. Since we don't have a backend attached to this project, we don't actaully want to POST anytihg. Then, we are validating that the text variable is not null - or more to the point, the text input box is not empty. `if (!text) { alert('Please add a task'); return; }`. Which read as if text is null, then alert, and return. Then we are firing the **addTask()** and passing in the variable of **text** `addTask(text);`. Lastly, we are clearing the value of the form by `setText('');`. Remember that SetText is the modification funciton from our text useState.
