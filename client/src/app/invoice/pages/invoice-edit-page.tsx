import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import InvoiceForm from '../invoice-form/invoice-form';
import QueryPanel from '../../../common/query/query-panel';
import { Client } from '../../client/client';
import { Invoice } from '../invoice';
import { invoiceService } from '../invoice-service';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

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

class InvoiceUpdatePage extends Component<InvoiceUpdatePageProps> {

    onSuccess = (resp: any) => {
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
                                onSuccess={this.onSuccess}
                            />
                        </React.Fragment>
                    )
                }
            </QueryPanel>
        );
    }
};

export default withRouter(InvoiceUpdatePage);