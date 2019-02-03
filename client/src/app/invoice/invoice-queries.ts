import gql from "graphql-tag";

export const INVOICE_CREATE_QUERY = gql`
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