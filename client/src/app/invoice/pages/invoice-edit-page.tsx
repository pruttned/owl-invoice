import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import InvoiceForm from '../invoice-form/invoice-form';
import QueryPanel from '../../../common/query/query-panel';
import { Client } from '../../client/client';
import { Invoice } from '../invoice';
import { invoiceService } from '../invoice-service';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import InvoiceRemoveDialog from '../invoice-remove-dialog/invoice-remove-dialog';
import { MenuItem, Divider } from '@material-ui/core';
import { INVOICE_FORM_GET_QUERY, INVOICE_UPDATE_MUTATION } from '../invoice-queries';
import { apiProxy, InvoiceTemplateDefinition } from '../../api-proxy';

interface Response {
    invoice: Invoice;
    clients: Client[];
};

interface InvoiceUpdatePageProps extends RouteComponentProps<any> {
}

interface InvoiceEditPageState {
    isRemoveDialogOpen: boolean;
}

class InvoiceUpdatePage extends Component<InvoiceUpdatePageProps, InvoiceEditPageState> {
    state: InvoiceEditPageState = {
        isRemoveDialogOpen: false
    };

    showRemoveItemDialog = () => {
        this.setState({
            isRemoveDialogOpen: true
        });
    };

    closeRemoveDialog = () => {
        this.setState({
            isRemoveDialogOpen: false
        });
    };

    redirectToList = (resp: any) => {
        this.props.history.push('/invoices');
    };

    redirectToClone = (id: string) => {
        this.props.history.push(`/invoices/${encodeURIComponent(id)}/clone`);
    };

    exportSk = (invoiceId: string) => {
        apiProxy.exportInvoice(invoiceId, InvoiceTemplateDefinition.DefaultSK);
    };

    exportAt = (invoiceId: string) => {
        apiProxy.exportInvoice(invoiceId, InvoiceTemplateDefinition.DefaultAT);
    };

    render() {
        return (

            <QueryPanel<Response> query={INVOICE_FORM_GET_QUERY} variables={{ id: this.props.match.params.id }}>
                {(data) =>
                    (
                        <React.Fragment>
                            <BreadcrumbsItem to={`/invoices/${encodeURIComponent(data.invoice.id)}`}>{data.invoice.id}</BreadcrumbsItem>
                            <InvoiceForm
                                invoice={{
                                    ...invoiceService.fromResponse(data.invoice),
                                    client: data.invoice.client.id
                                }}
                                clients={data.clients}
                                mutation={INVOICE_UPDATE_MUTATION}
                                successMessage="Invoice has been successfully updated"
                                onSuccess={this.redirectToList}
                                menuRender={(closeMenu: () => void) => [
                                    <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(); closeMenu(); }}>Remove</MenuItem>,
                                    <MenuItem key="clone" onClick={() => { this.redirectToClone(data.invoice.id); closeMenu(); }}>Clone</MenuItem>,
                                    <Divider />,
                                    <MenuItem key="export-sk" onClick={() => { this.exportSk(data.invoice.id); closeMenu(); }}>Export PDF - SK</MenuItem>,
                                    <MenuItem key="export-at" onClick={() => { this.exportAt(data.invoice.id); closeMenu(); }}>Export PDF - AT</MenuItem>,
                                ]}
                            />
                            <InvoiceRemoveDialog
                                open={this.state.isRemoveDialogOpen}
                                item={data.invoice}
                                onClose={this.closeRemoveDialog}
                                onSuccess={this.redirectToList}
                            />
                        </React.Fragment>
                    )
                }
            </QueryPanel>
        );
    }
};

export default withRouter(InvoiceUpdatePage);