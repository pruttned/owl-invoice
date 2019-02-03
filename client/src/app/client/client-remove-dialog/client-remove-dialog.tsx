import React, { Component } from 'react';
import { Client } from '../client';
import { DialogContentText } from '@material-ui/core';
import SubmitDialog from '../../../common/submit-dialog/submit-dialog';
import { Field } from 'formik';
import { CLIENT_REMOVE_MUTATION } from '../client-queries';

interface ClientRemoveDialogProps {
    item: Client;
    onClose: () => void;
    open: boolean;
    onSuccess?: (resp: any) => void;
}

class ClientRemoveDialog extends Component<ClientRemoveDialogProps>{

    confirmRemoveDialog = (postMutation: (model: any) => Promise<any>) => {
        postMutation({ id: module.id }).then(() => {
            this.props && this.props.onClose();
        });
    }

    render() {
        return (
            <SubmitDialog
                open={this.props.open}
                submitText="remove"
                mutation={CLIENT_REMOVE_MUTATION}
                formToModel={(form: Client) => form.id}
                successMessage={`${this.props.item!.name} was be removed`}
                initialValues={{ id: this.props.item!.id }}
                title={`Do you really want to remove ${this.props.item!.name}`}
                onClose={this.props.onClose}
                invalidateQueryCache={true}
                onSuccess={this.props.onSuccess}
            >
                {() => (
                    <DialogContentText id="remove-dialog-description">
                        <span><strong>{this.props.item!.name}</strong> will be permanently removed from the system</span>
                        <Field type="hidden" name="id" />
                    </DialogContentText>
                )}
            </SubmitDialog>
        );
    }

}

export default ClientRemoveDialog;


















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
//             <DialogTitle id="remove-dialog-title">Do you really want to remove {this.props.item && this.props.item.name}</DialogTitle>
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
//                     successMessage={`${this.props.item && this.props.item.name} was be removed`}
//                 >
//                     {({ loading, postMutation }: MutationDialogChildrenProps) => (
//                         <React.Fragment>
//                             <DialogContent>
//                                 <DialogContentText id="remove-dialog-description">
//                                     <strong>{this.props.item && this.props.item.name}</strong> will be permanently removed from the system
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