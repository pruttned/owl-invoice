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
                successMessage={`${this.props.item!.name} has been removed`}
                initialValues={{ id: this.props.item!.id }}
                title={`Do you really want to remove ${this.props.item!.name}?`}
                onClose={this.props.onClose}
                invalidateQueryCache={true}
                onSuccess={this.props.onSuccess}
            >
                {() => (
                    <DialogContentText>
                        <span><strong>{this.props.item!.name}</strong> will be permanently removed from the system</span>
                        <Field type="hidden" name="id" />
                    </DialogContentText>
                )}
            </SubmitDialog>
        );
    }

}

export default ClientRemoveDialog;