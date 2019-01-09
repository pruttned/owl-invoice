import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list/client-list';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import PageFab from '../../../common/page-fab/page-fab';

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

interface ClientListPageProps extends RouteComponentProps<any> {
}

class ClientListPage extends Component<ClientListPageProps>{
    navigateToAdd = () => {
        this.props.history.push('/clients/new');
    };

    render() {
        return (
            <React.Fragment>
                <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
                    {(data) => {
                        return <ClientList items={data.clients} />
                    }}
                </QueryPanel>
                <PageFab onClick={this.navigateToAdd}>
                    <AddIcon />
                </PageFab>
            </React.Fragment>
        );
    }

}

export default withRouter(ClientListPage);