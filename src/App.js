import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const name = useName('Felix');
  const age = useName('18');
  const showTest = useName('clear to unmount Test');
  const width = useWidth();
  useTitle({name: name.value, age: age.value});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <FormControl {...name} />
          <FormControl {...age} />
          <FormControl {...showTest} />
          <div>window.innerWidth is {width}</div>
          {
            showTest.value ? (
              <Test />
            ) : null
          }
        </div>
      </header>
    </div>
  )
}

function FormControl(props) {
  return (
    <div>
      <input {...props} />
    </div>
  )
}

const handleClick = () => {console.log('click')};

function Test() {
  useEffect(() => {
    console.log('test use effect');
    document.addEventListener('click', handleClick);
    return () => {
      console.log('test remove effect');
      document.removeEventListener('click', handleClick);
    };
  });
  return (
    <div style={{ margin: 20 }}>
      test component, when Test component unmount, will remove test effect.
    </div>
  )
}

function useName(initial) {
  const [name, setName] = useState(initial);
  const handleNameChange = (e) => setName(e.target.value);

  return {
    value: name,
    onChange: handleNameChange,
  }
}

function useWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      console.log('handleResize');
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return function hello() {
      console.log('remove resize listener');
      window.removeEventListener('resize', handleResize);
    }
  }, [width]);
  return width;
}

function useTitle(title) {
  const { name, age } = title;
  useEffect(() => {
    document.title = `${name} ${age}`;
  }, [name]);
}