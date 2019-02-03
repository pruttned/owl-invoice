import React, { Component } from 'react';
import gql from 'graphql-tag';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import InvoiceForm from '../invoice-form/invoice-form';
import Decimal from 'decimal.js';
import QueryPanel from '../../../common/query/query-panel';
import { Client } from '../../client/client';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { INVOICE_CREATE_MUTATION } from '../invoice-queries';
import { CLIENT_LIST_QUERY } from '../../client/client-queries';

interface Response {
    clients: Client[];
};

interface InvoiceCreatePageProps extends RouteComponentProps<any> {
}

class InvoiceCreatePage extends Component<InvoiceCreatePageProps> {

    onSuccess = (resp: any) => {
        this.props.history.push('/invoices');
    };

    getDefaultDueDate = () => {
        let date = new Date();
        date.setDate(date.getDate() + 20);
        return date;
    };

    render() {
        return (

            <QueryPanel<Response> query={CLIENT_LIST_QUERY}>
                {(data) =>
                    (
                        <React.Fragment>
                            <BreadcrumbsItem to="/invoices/new">New</BreadcrumbsItem>
                            <InvoiceForm
                                invoice={{
                                    dueDate: this.getDefaultDueDate(),
                                    issueDate: new Date(),
                                    client: data.clients[0].id,
                                    items: [{ text: '', unitCount: new Decimal(1), unitPrice: new Decimal(1) }],
                                }}
                                clients={data.clients}
                                mutation={INVOICE_CREATE_MUTATION}
                                successMessage="Inivoice has been successfully created"
                                onSuccess={this.onSuccess}
                                invalidateQueryCache={true}
                            />
                        </React.Fragment>
                    )
                }
            </QueryPanel>
        );
    }
};

export default withRouter(InvoiceCreatePage);