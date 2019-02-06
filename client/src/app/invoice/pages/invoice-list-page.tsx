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
import { MenuItem, Divider } from '@material-ui/core';
import InvoiceRemoveDialog from '../invoice-remove-dialog/invoice-remove-dialog';
import { INVOICE_LIST_QUERY } from '../invoice-queries';
import { AppContext, AppContextValue } from '../../app-store/app-context';
import { apiProxy, InvoiceTemplateDefinition } from '../../api-proxy';

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

    exportSk = (invoiceId: string) => {
        apiProxy.exportInvoice(invoiceId, InvoiceTemplateDefinition.DefaultSK);
    };

    exportAt = (invoiceId: string) => {
        apiProxy.exportInvoice(invoiceId, InvoiceTemplateDefinition.DefaultAT);
    };
    
    render() {
        return (
            <AppContext.Consumer>
                {(context: AppContextValue) => (
                    <React.Fragment>
                        <QueryPanel<Response> query={INVOICE_LIST_QUERY}>
                            {(data) => {
                                const invoices = data.invoices && data.invoices.map(invoice => invoiceService.fromResponse(invoice));
                                return <InvoiceList
                                    items={invoices}
                                    menuRender={(item: Invoice, closeMenu: () => void) => [
                                        <MenuItem key="remove" onClick={() => { this.showRemoveItemDialog(item); closeMenu(); }}>Remove</MenuItem>,
                                        <MenuItem key="clone" onClick={() => { this.redirectToClone(item.id); closeMenu(); }}>Clone</MenuItem>,
                                        <Divider />,
                                        <MenuItem key="export-sk" onClick={() => { this.exportSk(item.id); closeMenu(); }}>Export PDF - SK</MenuItem>,
                                        <MenuItem key="export-at" onClick={() => { this.exportAt(item.id); closeMenu(); }}>Export PDF - AT</MenuItem>,
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
                                onSuccess={() => context.appStore.refreshStore()}
                            />
                        )}
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        );
    }
}

export default withRouter(InvoiceListPage);