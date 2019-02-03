import React, { Component } from 'react';
import gql from 'graphql-tag';
import QueryPanel from '../../../common/query/query-panel';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Supplier } from '../supplier';
import SupplierForm from '../supplier-form/supplier-form';

const SUPPLIER_GET_QUERY = gql`
    query getSupplier {
        supplier {
            id
            name
            address
            taxId 
            businessId 
            vatNumber 
            register
            iban
            bank
            phoneNumber
            email
        }
    } 
`;

const SUPPLIER_UPDATE_MUTATION = gql`
mutation updateSupplier($model:UpdateSupplierInput!) {
    updateSupplier(input: $model) {
            id
            name
            address
            taxId 
            businessId 
            vatNumber 
            register
            iban
            bank
            phoneNumber
            email
    }
  } 
`;



interface Response {
    supplier: Supplier;
};

interface SupplierEditPageProps extends RouteComponentProps<any> {
}


class SupplierEditPage extends Component<SupplierEditPageProps> {
    redirectToHome = (resp: any) => {
        this.props.history.push('/');
    };

    render() {
        return (
            <QueryPanel<Response> query={SUPPLIER_GET_QUERY}>
                {(data) =>
                    (
                        <React.Fragment>
                            <SupplierForm
                                supplier={data.supplier}
                                mutation={SUPPLIER_UPDATE_MUTATION}
                                successMessage="Supplier has been successfully updated"
                                onSuccess={this.redirectToHome}
                            />
                        </React.Fragment>
                    )
                }
            </QueryPanel>
        );
    }
};

export default withRouter(SupplierEditPage);