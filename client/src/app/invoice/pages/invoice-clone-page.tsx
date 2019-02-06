import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import QueryPanel from '../../../common/query/query-panel';
import { Invoice } from '../invoice';
import { INVOICE_FORM_GET_QUERY, INVOICE_CREATE_MUTATION } from '../invoice-queries';
import InvoiceForm from '../invoice-form/invoice-form';
import { Client } from '../../client/client';
import { invoiceService } from '../invoice-service';
import moment from 'moment';

interface InvoiceClonePageProps extends RouteComponentProps<any> {
}

interface GetResponse {
    invoice: Invoice;
    clients: Client[];
};

class InvoiceClonePage extends Component<InvoiceClonePageProps> {

    redirectToList = (resp: any) => {
        this.props.history.push('/invoices');
    };

    getDueDate = (original: Invoice) => {
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + original.dueDate.getDate() - original.issueDate.getDate());
        return dueDate;
    };

    //TODO: extract from create
    getDeliveryDate = () => {
        return moment().add('months', -1).endOf('month').toDate();
    };

    render() {
        return (
            <QueryPanel<GetResponse> query={INVOICE_FORM_GET_QUERY} variables={{ id: this.props.match.params.id }}>
                {(data) => {
                    let original = invoiceService.fromResponse(data.invoice);
                    let invoice = {
                        ...original,
                        client: original.client.id,
                        issueDate: new Date(),
                        deliveryDate: this.getDeliveryDate(),
                        dueDate: this.getDueDate(original),
                        items: original.items.map(item => ({ ...item }))
                    };
                    delete invoice.id;

                    return (
                        <React.Fragment>
                            <BreadcrumbsItem to={`/invoices/${encodeURIComponent(this.props.match.params.id)}`}>{original.id}</BreadcrumbsItem>
                            <BreadcrumbsItem to={`/invoices/${encodeURIComponent(this.props.match.params.id)}/clone`}>Clone</BreadcrumbsItem>

                            <InvoiceForm
                                invoice={invoice}
                                clients={data.clients}
                                mutation={INVOICE_CREATE_MUTATION}
                                successMessage="Inivoice has been successfully created"
                                onSuccess={this.redirectToList}
                                invalidateQueryCache={true}
                            />
                        </React.Fragment>
                    );
                }}
            </QueryPanel>
        );
    }
};

export default withRouter(InvoiceClonePage);