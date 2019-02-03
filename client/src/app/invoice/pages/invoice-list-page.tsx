import React, { Component } from 'react';
import { Invoice } from '../invoice';
import Decimal from 'decimal.js';
import InvoiceList from '../invoice-list/invoice-list';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { invoiceService } from '../invoice-service';
import PageFab from '../../../common/page-fab/page-fab';
import { Add as AddIcon } from '@material-ui/icons';
import { withRouter, RouteComponentProps } from 'react-router';
import { MenuItem } from '@material-ui/core';
import InvoiceRemoveDialog from '../invoice-remove-dialog/invoice-remove-dialog';

const INVOICE_LIST_QUERY = gql`
    query listInvoices {
        invoices {
            id
            dueDate
            issueDate
            client {
                id
                name
                color
                initials
            }
            items{
                unitCount
                unitPrice
            }
        }
    }
`;

interface Response {
    invoices: Invoice[];
};

interface InvoiceListProps extends RouteComponentProps<any> {
}

interface InvoiceListState {
    itemToRemove: Invoice | null;
    isRemoveDialogOpen: boolean;
}

class InvoiceListPage extends Component<InvoiceListProps, InvoiceListState> {
    state: InvoiceListState = {
        itemToRemove: null,
        isRemoveDialogOpen: false
    };

    redirectToClone = (id: string) => {
        this.props.history.push(`/invoices/${encodeURIComponent(id)}/clone`);
    };

    navigateToAdd = () => {
        this.props.history.push('/invoices/new');
    };

    showRemoveItemDialog = (item: Invoice) => {
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

    render() {
        return (
            <React.Fragment>
                <QueryPanel<Response> query={INVOICE_LIST_QUERY}>
                    {(data) => {
                        const invoices = data.invoices && data.invoices.map(invoice => invoiceService.fromResponse(invoice));
                        return <InvoiceList
                            items={invoices}
                            menuRender={(item: Invoice, closeMenu: () => void) => [
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
                    <InvoiceRemoveDialog
                        open={this.state.isRemoveDialogOpen}
                        item={this.state.itemToRemove}
                        onClose={this.closeRemoveDialog}
                    />
                )}
            </React.Fragment>
        );
    }
}

export default withRouter(InvoiceListPage);