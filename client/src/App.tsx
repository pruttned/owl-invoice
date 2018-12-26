import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from '@material-ui/core/Button';
import ItemList from './common/item-list';
import { MenuItem } from '@material-ui/core';
import InvoiceList from './app/invoice/invoice-list';
import { Invoice } from './app/invoice/invoice';
import Decimal from 'decimal.js';

const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
const items: Invoice[] = [
  {
    id: '1', issueDate: new Date(), dueDate: new Date(), number: '2018001', client:
    {
      name: 'client 1',
      color: '#00d8ff',
      initials: 'C1'
    },
    items: [{
      text: 't',
      unitCount: new Decimal(2),
      unitPrice: new Decimal(3),

    }]
  },
  {
    id: '2', issueDate: new Date(), dueDate: new Date(), number: '2018002',
    client: {
      name: 'client 2',
      color: 'red',
      initials: 'C2'
    },
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
  {
    id: '3', issueDate: nextMonth, dueDate: new Date(), number: '2018003',
    client: {
      name: 'client 2',
      color: 'red',
      initials: 'C2'
    },
    items: [{
      text: 't',
      unitCount: new Decimal(1),
      unitPrice: new Decimal(10),
    },
    ]
  },
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <InvoiceList items={items} />
        </div>
      </div>

    );
  }
}

export default App;
