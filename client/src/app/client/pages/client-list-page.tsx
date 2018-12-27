import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list/client-list';

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

class ClientListPage extends Component {
    render() {
        return (
            <ClientList items={clients} />
        );
    }
}

export default ClientListPage;