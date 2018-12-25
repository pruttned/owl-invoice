import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from '@material-ui/core/Button';
import ItemList from './common/item-list';
import { MenuItem } from '@material-ui/core';
import InvoiceList from './app/invoice/invoice-list';
import { Invoice } from './app/invoice/invoice-service';
import Decimal from 'decimal.js';

const items: Invoice[] = [
  {
    id: '1', issueDate: new Date(), dueDate: new Date(), number: '2018001', client: { name: 'client 1' },
    items: [{
      text: 't',
      unitCount: new Decimal(2),
      unitPrice: new Decimal(3),

    }]
  },
  {
    id: '2', issueDate: new Date(), dueDate: new Date(), number: '2018002', client: { name: 'client 1' },
    items: [{
      text: 't',
      unitCount: new Decimal(1),
      unitPrice: new Decimal(10),
    },
    {
      text: 't2',
      unitCount: new Decimal(2),
      unitPrice: new Decimal(1),
    }]
  },
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
