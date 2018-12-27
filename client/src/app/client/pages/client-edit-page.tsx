import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list';
import ClientForm from '../client-form';

const client: Client =
{
    id: 'c1',
    name: 'client 1',
    color: '#00d8ff',
    initials: 'C1',
    address: 'address xxx',
    taxId: 'dic1',
    businessId: 'ico1',
    vatNumber: 'icdph1'
};


class ClientEditPage extends Component {
    render() {
        return (
            <ClientForm client={client} />
        );
    }
}

export default ClientEditPage;