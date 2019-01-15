import React, { Component } from 'react';
import { Client } from '../client';
import ClientForm from '../client-form/client-form';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';


const CLIENT_CREATE_MUTATION = gql`
mutation createClient($model:CreateClientInput!) {
    createClient(input: $model) {
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

interface ClientCreatePageProps extends RouteComponentProps<any> {
}


class ClientCreatePage extends Component<ClientCreatePageProps> {

    onSuccess = (resp: any) => {
        this.props.history.push('/clients');
    };

    render() {
        return (
            <ClientForm client={{
                name: '',
                color: '#75beff',
                initials: '',
                address: '',
                taxId: '',
                businessId: '',
                vatNumber: '',
            }}
                mutation={CLIENT_CREATE_MUTATION}
                successMessage="Client has been successfully created"
                onSuccess={this.onSuccess}
                invalidateQueryCache={true}
            />
        );
    }
};

export default withRouter(ClientCreatePage);