import React, { Component } from 'react';
import ClientForm from '../client-form/client-form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { CLIENT_CREATE_MUTATION } from '../client-queries';

interface ClientCreatePageProps extends RouteComponentProps<any> {
}

class ClientCreatePage extends Component<ClientCreatePageProps> {

    redirectToList = (resp: any) => {
        this.props.history.push('/clients');
    };

    render() {
        return (
            <React.Fragment>
                <BreadcrumbsItem to="/clients/new">New</BreadcrumbsItem>
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
                    onSuccess={this.redirectToList}
                    invalidateQueryCache={true}
                />
            </React.Fragment>
        );
    }
};

export default withRouter(ClientCreatePage);