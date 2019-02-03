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
import { MenuItem } from '@material-ui/core';

const GET_QUERY = gql`
    query getInvoice($id: String!) {
        invoice(id: $id) {
            id
            issueDate
            dueDate
            client {
                id
                name
                color
                initials
                address
                taxId
                businessId
                vatNumber
            }
            items {
                text
                unitCount
                unitPrice
            }
        }
        clients {
            id
            name
        }
    }
`;

const INVOICE_UPDATE_QUERY = gql`
mutation updateInvoice($model:UpdateInvoiceInput!) {
    updateInvoice(input: $model) {
        id
        issueDate
        dueDate
        client {
            id
            name
            color
            initials
            address
            taxId
            businessId
            vatNumber
        }
        items {
            text
            unitCount
            unitPrice
        }
    }
  } 
`;

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

    render() {
        return (

            <QueryPanel<Response> query={GET_QUERY} variables={{ id: this.props.match.params.id }}>
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
                                mutation={INVOICE_UPDATE_QUERY}
                                successMessage="Inivoice has been successfully updated"
                                onSuccess={this.redirectToList}
                                menuRender={(closeMenu: () => void) => [
                                    <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(); closeMenu(); }}>Remove</MenuItem>,
                                    // <MenuItem key="clone" onClick={() => { this.redirectToClone(data.client.id); closeMenu(); }}>Clone</MenuItem>,
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