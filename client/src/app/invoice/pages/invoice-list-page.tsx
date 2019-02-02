import React, { Component } from 'react';
import { Invoice } from '../invoice';
import Decimal from 'decimal.js';
import InvoiceList from '../invoice-list/invoice-list';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { invoiceService } from '../invoice-service';
import PageFab from '../../../common/page-fab/page-fab';
import { Add as AddIcon } from '@material-ui/icons';
import { withRouter } from 'react-router';

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

class InvoiceListPage extends Component<any> {
    navigateToAdd = () => {
        this.props.history.push('/invoices/new');
    };

    render() {
        return (
            <React.Fragment>
                <QueryPanel<Response> query={INVOICE_LIST_QUERY}>
                    {(data) => {
                        const invoices = data.invoices && data.invoices.map(invoice => invoiceService.fromResponse(invoice));
                        return <InvoiceList items={invoices} />
                    }}
                </QueryPanel>
                <PageFab onClick={this.navigateToAdd}>
                    <AddIcon />
                </PageFab>
            </React.Fragment>
        );
    }
}

export default withRouter(InvoiceListPage);