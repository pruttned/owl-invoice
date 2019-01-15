import React, { Component } from 'react';
import { Client } from '../client';
import ClientForm from '../client-form/client-form';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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

const CLIENT_UPDATE_MUTATION = gql`
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

interface ClientCreatePageProps extends RouteComponentProps<any> {
}


class ClientEditPage extends Component<ClientCreatePageProps> {

    onSuccess = (resp: any) => {
        this.props.history.push('/clients');
    };

    render() {
        return (
            <QueryPanel<Response> query={CLIENT_GET_QUERY} variables={{ id: this.props.match.params.id }}>
                {(data) =>
                    (
                        <ClientForm
                            client={data.client}
                            mutation={CLIENT_UPDATE_MUTATION}
                            successMessage="Client has been successfully updated"
                            onSuccess={this.onSuccess}
                        />
                    )
                }
            </QueryPanel>
        );
    }
};

export default withRouter(ClientEditPage);