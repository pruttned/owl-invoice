import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from '@material-ui/core/Button';
import ItemList from './common/item-list';
import { MenuItem } from '@material-ui/core';
import InvoiceList from './app/invoice/invoice-list';

const items = [
  { id: '1', date: 'n1', amount:'10' },
  { id: '2', date: 'n2', amount:'10' },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload XXXX.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn ReactXX
          </a>
        </header>
        <div>
          <InvoiceList items={items} />
        </div>
      </div>

    );
  }
}

export default App;
