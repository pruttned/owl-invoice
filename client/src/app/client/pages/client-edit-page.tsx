import React, { Component } from 'react';
import { Client } from '../client';
import ClientForm from '../client-form/client-form';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { Mutation } from 'react-apollo';
import { pick } from 'lodash';

const CLIENT_GET_QUERY = gql`
    query getClient($id: String!) {
        client(id: $id) {
            id
            name
            color
            initials
            address
            taxId
            businessId
            vatNumber
        }
    } 
`;

const CLIENT_UPDATE_QUERY = gql`
mutation updateClient($model:UpdateClientInput!) {
    updateClient(input: $model) {
        id
        name
        color
        initials
        address
        taxId
        businessId
        vatNumber
    }
  } 
`;



interface Response {
    client: Client;
};

const ClientEditPage = ({ match }: { match: any }) => (
    <QueryPanel<Response> query={CLIENT_GET_QUERY} variables={{ id: match.params.id }}>
        {(data) => {
            return <ClientForm client={data.client} mutation={CLIENT_UPDATE_QUERY} />
        }}
    </QueryPanel>
)

export default ClientEditPage;