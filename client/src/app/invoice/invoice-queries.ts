import gql from "graphql-tag";

export const INVOICE_CREATE_MUTATION = gql`
mutation createInvoice($model:CreateInvoiceInput!) {
    createInvoice(input: $model) {
        id
        issueDate
        dueDate
        client {
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

export const INVOICE_FORM_GET_QUERY = gql`
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

export const INVOICE_LIST_QUERY = gql`
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

export const INVOICE_UPDATE_MUTATION = gql`
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