import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list/client-list';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';

const CLIENT_LIST_QUERY = gql`
    query listClients {
        clients {
            id
            name
            color
            initials
        }
    }
`;

interface Response {
    clients: Client[];
};

export default () => (
    <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
        {(data) => {
            return <ClientList items={data.clients} />
        }}
    </QueryPanel>
)