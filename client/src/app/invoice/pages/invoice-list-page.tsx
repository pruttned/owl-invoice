import React, { Component } from 'react';
import { Client } from '../../client/client';
import { Invoice } from '../invoice';
import Decimal from 'decimal.js';
import InvoiceList from '../invoice-list/invoice-list';

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


const nextMonth = new Date();
nextMonth.setMonth(nextMonth.getMonth() + 1);
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
    {
        id: '3', issueDate: nextMonth, dueDate: new Date(), number: '2018003',
        client: clients[1],
        items: [{
            text: 't',
            unitCount: new Decimal(1),
            unitPrice: new Decimal(10),
        },
        ]
    },
]

class InvoiceListPage extends Component {
    render() {
        return (
            <InvoiceList items={invoices} />
        );
    }
}

export default InvoiceListPage;