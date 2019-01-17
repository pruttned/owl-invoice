import React, { Component } from 'react';
import { Client } from '../client';
import ClientList from '../client-list/client-list';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Add as AddIcon } from '@material-ui/icons';
import PageFab from '../../../common/page-fab/page-fab';
import { MenuItem, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';
import SubmitDialog from '../../../common/submit-dialog/submit-dialog';
import { pick } from 'lodash';
import { Field } from 'formik';

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

const CLIENT_REMOVE_MUTATION = gql`
    mutation removeClient($model:String!) {
        removeClient(id: $model)
    } 
`;

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

    render() {
        let removeDialogTitle = (
            <DialogTitle id="remove-dialog-title">Do you really want to remove {this.state.itemToRemove && this.state.itemToRemove.name}</DialogTitle>
        );
        return (
            <React.Fragment>
                <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
                    {(data) => {
                        return <ClientList
                            items={data.clients}
                            menuRender={(item: Client, closeMenu: () => void) => [
                                <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(item); closeMenu(); }}>Remove {item.name}</MenuItem>,
                            ]}
                        />
                    }}
                </QueryPanel>
                <PageFab onClick={this.navigateToAdd}>
                    <AddIcon />
                </PageFab>
                {this.state.itemToRemove && (
                    <SubmitDialog
                        open={this.state.isRemoveDialogOpen}
                        submitText="remove"
                        mutation={CLIENT_REMOVE_MUTATION}
                        formToModel={(form: Client) => form.id}
                        successMessage={`${this.state.itemToRemove!.name} was be removed`}
                        initialValues={{ id: this.state.itemToRemove!.id }}
                        title={`Do you really want to remove ${this.state.itemToRemove!.name}`}
                        onClose={this.closeRemoveDialog}
                        invalidateQueryCache={true}
                    >
                        {() => (
                            <DialogContentText id="remove-dialog-description">
                                <span><strong>{this.state.itemToRemove!.name}</strong> will be permanently removed from the system</span>
                                <Field type="hidden" name="id" />
                            </DialogContentText>
                        )}
                    </SubmitDialog>
                )}
            </React.Fragment>
        );
    }

}

export default withRouter(ClientListPage);


















// import React, { Component } from 'react';
// import { Client } from '../client';
// import ClientList from '../client-list/client-list';
// import gql from 'graphql-tag';
// import QueryPanel from '../../../common/query/query-panel';
// import { withRouter, RouteComponentProps } from 'react-router-dom';
// import { Add as AddIcon } from '@material-ui/icons';
// import PageFab from '../../../common/page-fab/page-fab';
// import { MenuItem, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions, Button } from '@material-ui/core';
// import MutationDialog, { MutationDialogChildrenProps } from '../../../common/mutation-dialog/mutation-dialog';

// const CLIENT_LIST_QUERY = gql`
//     query listClients {
//         clients {
//             id
//             name
//             color
//             initials
//         }
//     }
// `;

// const CLIENT_REMOVE_MUTATION = gql`
//     mutation removeClient($id:String!) {
//         removeClient(id: $id) {
//             id
//         }
//     } 
// `;

// interface Response {
//     clients: Client[];
// };

// interface ClientListPageProps extends RouteComponentProps<any> {
// }

// interface ClientListState {
//     itemToRemove: Client | null;
//     isRemoveDialogOpen: boolean;
// }

// class ClientListPage extends Component<ClientListPageProps, ClientListState>{
//     state: ClientListState = {
//         itemToRemove: null,
//         isRemoveDialogOpen: false
//     };

//     navigateToAdd = () => {
//         this.props.history.push('/clients/new');
//     };
//     showRemoveItemDialog = (item: Client) => {
//         this.setState({
//             itemToRemove: item,
//             isRemoveDialogOpen: true
//         });
//     };

//     closeRemoveDialog = () => {
//         this.setState({
//             itemToRemove: null,
//             isRemoveDialogOpen: false
//         });
//     };

//     confirmRemoveDialog = (postMutation: (model: any) => Promise<any>) => {
//         postMutation({ id: '123' }).then(() => {
//             this.closeRemoveDialog();
//         });
//     }

//     render() {
//         let removeDialogTitle = (
//             <DialogTitle id="remove-dialog-title">Do you really want to remove {this.state.itemToRemove && this.state.itemToRemove.name}</DialogTitle>
//         );
//         return (
//             <React.Fragment>
//                 <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
//                     {(data) => {
//                         return <ClientList
//                             items={data.clients}
//                             menuRender={(item: Client, closeMenu: () => void) => [
//                                 <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(item); closeMenu(); }}>Remove {item.name}</MenuItem>,
//                             ]}
//                         />
//                     }}
//                 </QueryPanel>
//                 <PageFab onClick={this.navigateToAdd}>
//                     <AddIcon />
//                 </PageFab>
//                 <MutationDialog
//                     open={this.state.isRemoveDialogOpen}
//                     onClose={this.closeRemoveDialog}
//                     mutation={CLIENT_REMOVE_MUTATION}
//                     dialogTitle={removeDialogTitle}
//                     successMessage={`${this.state.itemToRemove && this.state.itemToRemove.name} was be removed`}
//                 >
//                     {({ loading, postMutation }: MutationDialogChildrenProps) => (
//                         <React.Fragment>
//                             <DialogContent>
//                                 <DialogContentText id="remove-dialog-description">
//                                     <strong>{this.state.itemToRemove && this.state.itemToRemove.name}</strong> will be permanently removed from the system
//                                     </DialogContentText>
//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={this.closeRemoveDialog} color="primary" autoFocus disabled={loading}>
//                                     Cancel
//                                 </Button>
//                                 <Button onClick={() => this.confirmRemoveDialog(postMutation)} color="primary" disabled={loading}>
//                                     Remove
//                                 </Button>
//                             </DialogActions>
//                         </React.Fragment>
//                     )}
//                 </MutationDialog>
//             </React.Fragment>
//         );
//     }

// }

// export default withRouter(ClientListPage);