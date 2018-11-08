import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

export default function App() {
  const name = useName('Felix');
  const age = useName('18');
  const color = useName('red');
  const width = useWidth();
  useTitle({name: name.value, age: age.value});

  useEffect(() => {
    console.log('color effect');
  });


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
        <input {...name} />
        <input {...age} />
        <input {...color} />
        <div>{width}</div>
      </header>
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
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  });
  return width;
}

function useTitle(title) {
  const { name, age } = title;
  useEffect(() => {
    document.title = `${name} ${age}`;
  }, [name]);
}