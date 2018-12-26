import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import Button from '@material-ui/core/Button';
import ItemList from './common/item-list';
import { MenuItem } from '@material-ui/core';
import InvoiceList from './app/invoice/invoice-list';
import { Invoice } from './app/invoice/invoice';
import Decimal from 'decimal.js';
import { Client } from './app/client/client';
import ClientList from './app/client/client-list';

const clients: Client[] = [
  {
    id: 'c1',
    name: 'client 1',
    color: '#00d8ff',
    initials: 'C1',
    address: 'address xxx',
    taxId: 'dic1',
    businessId: 'ico1',
    vatNumber: 'icdph1'
  },
  {
    id: 'c2',
    name: 'client 2',
    color: 'red',
    initials: 'C2',
    address: 'address xxx2',
    taxId: 'dic2',
    businessId: 'ico2',
    vatNumber: 'icdph2'
  }
]


const invoices: Invoice[] = [
  {
    id: '1', issueDate: new Date(), dueDate: new Date(), number: '2018001', client: clients[0],
    items: [{
      text: 't',
      unitCount: new Decimal(2),
      unitPrice: new Decimal(3),

    }]
  },
  {
    id: '2', issueDate: new Date(), dueDate: new Date(), number: '2018002',
    client: clients[1],
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
        <div>
          <InvoiceList items={invoices} />
          <br /><br />
          <ClientList items={clients} />
        </div>
      </div>

    );
  }
}

export default App;
