import React, { Component } from 'react';
import gql from 'graphql-tag';
import { DialogContentText } from '@material-ui/core';
import SubmitDialog from '../../../common/submit-dialog/submit-dialog';
import { Field } from 'formik';
import { Invoice } from '../invoice';

const INVOICE_REMOVE_MUTATION = gql`
    mutation removeInvoice($model:String!) {
        removeInvoice(id: $model)
    } 
`;

interface InvoiceRemoveDialogProps {
    item: Invoice;
    onClose: () => void;
    open: boolean;
    onSuccess?: (resp: any) => void;
}

class InvoiceRemoveDialog extends Component<InvoiceRemoveDialogProps>{
    render() {
        return (
            <SubmitDialog
                open={this.props.open}
                submitText="remove"
                mutation={INVOICE_REMOVE_MUTATION}
                formToModel={(form: Invoice) => form.id}
                successMessage={`${this.props.item!.id} has been removed`}
                initialValues={{ id: this.props.item!.id }}
                title={`Do you really want to remove ${this.props.item!.id} ?`}
                onClose={this.props.onClose}
                invalidateQueryCache={true}
                onSuccess={this.props.onSuccess}
            >
                {() => (
                    <DialogContentText>
                        <span><strong>{this.props.item!.id}</strong> will be permanently removed from the system</span>
                        <Field type="hidden" name="id" />
                    </DialogContentText>
                )}
            </SubmitDialog>
        );
    }
}

export default InvoiceRemoveDialog;