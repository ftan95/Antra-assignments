import { useEffect, useState } from 'react';
import './App.css';

const ComponentOne = () => {
  // ComponentWillUnmount
  useEffect(() => {
    console.log('See what happens');
    return () => {
        console.log('Do some cleanup');
    }
  }, [])

  return (
    <h1>Testing Unmounting</h1>
  )
};

function App() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(true);

  // ComponentDidMount
  useEffect(() => {
    console.log("ComponentDidMount");
    setCount(100);
    console.log(count);
  }, []);

  // ComponentDidUpdate
  useEffect(() => {
    console.log(count);
  }, [count]);

  const addHandler = () => {
    setCount(count+1);
  }

  let comp;
  if (display) {
    comp = <ComponentOne />;
  }

  return (
    <div className="App">
      <h1>{count}</h1>
      <button onClick={addHandler}>+</button>
      {comp}
      <button onClick={() => {setDisplay(true)}}>Create Component</button>
      <button onClick={() => {setDisplay(false)}}>Delete Component</button>
    </div>
  );
}

export default App;
