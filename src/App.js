import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home'



class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  }
}

export default App;
