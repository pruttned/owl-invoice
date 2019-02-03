import React, { Component } from 'react';
import { Client } from '../client';
import ClientForm from '../client-form/client-form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { CLIENT_CREATE_MUTATION, CLIENT_GET_QUERY } from '../client-queries';
import QueryPanel from '../../../common/query/query-panel';

interface ClientClonePageProps extends RouteComponentProps<any> {
}

interface GetResponse {
    client: Client;
};

class ClientClonePage extends Component<ClientClonePageProps> {

    redirectToList = (resp: any) => {
        this.props.history.push('/clients');
    };

    render() {
        return (
            <QueryPanel<GetResponse> query={CLIENT_GET_QUERY} variables={{ id: this.props.match.params.id }}>
                {(data) => {
                    let client = { ...data.client };
                    delete client.id;
                    client.name += ' clone';

                    return (
                        <React.Fragment>
                            <BreadcrumbsItem to={`/clients/${encodeURIComponent(this.props.match.params.id)}`}>{data.client.name}</BreadcrumbsItem>
                            <BreadcrumbsItem to={`/clients/${encodeURIComponent(this.props.match.params.id)}/clone`}>Clone</BreadcrumbsItem>

                            <ClientForm client={client}
                                mutation={CLIENT_CREATE_MUTATION}
                                successMessage="Client has been successfully created"
                                onSuccess={this.redirectToList}
                                invalidateQueryCache={true}
                            />
                        </React.Fragment>
                    );
                }}
            </QueryPanel>
        );
    }
};

export default withRouter(ClientClonePage);