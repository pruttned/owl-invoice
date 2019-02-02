import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list/client-list';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import PageFab from '../../../common/page-fab/page-fab';
import { MenuItem, DialogTitle } from '@material-ui/core';
import ClientRemoveDialog from '../client-remove-dialog/client-remove-dialog';
import { CLIENT_LIST_QUERY } from '../client-queries';

interface Response {
    clients: Client[];
};

interface ClientListPageProps extends RouteComponentProps<any> {
}

interface ClientListState {
    itemToRemove: Client | null;
    isRemoveDialogOpen: boolean;
}

class ClientListPage extends Component<ClientListPageProps, ClientListState>{
    state: ClientListState = {
        itemToRemove: null,
        isRemoveDialogOpen: false
    };

    navigateToAdd = () => {
        this.props.history.push('/clients/new');
    };
    showRemoveItemDialog = (item: Client) => {
        this.setState({
            itemToRemove: item,
            isRemoveDialogOpen: true
        });
    };

    closeRemoveDialog = () => {
        this.setState({
            itemToRemove: null,
            isRemoveDialogOpen: false
        });
    };

    confirmRemoveDialog = (postMutation: (model: any) => Promise<any>) => {
        postMutation({ id: '123' }).then(() => {
            this.closeRemoveDialog();
        });
    }

    redirectToClone = (id: string) => {
        this.props.history.push(`/clients/${encodeURIComponent(id)}/clone`);
    };

    render() {
        return (
            <React.Fragment>
                <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
                    {(data) => {
                        return <ClientList
                            items={data.clients}
                            menuRender={(item: Client, closeMenu: () => void) => [
                                <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(item); closeMenu(); }}>Remove</MenuItem>,
                                <MenuItem key="clone" onClick={() => { this.redirectToClone(item.id); closeMenu(); }}>Clone</MenuItem>,
                            ]}
                        />
                    }}
                </QueryPanel>
                <PageFab onClick={this.navigateToAdd}>
                    <AddIcon />
                </PageFab>
                {this.state.itemToRemove && (
                    <ClientRemoveDialog
                        open={this.state.isRemoveDialogOpen}
                        item={this.state.itemToRemove}
                        onClose={this.closeRemoveDialog}
                    />
                )}
            </React.Fragment>
        );
    }

}

export default withRouter(ClientListPage);