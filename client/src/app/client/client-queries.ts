import gql from "graphql-tag";

export const CLIENT_CREATE_MUTATION = gql`
mutation createClient($model:CreateClientInput!) {
    createClient(input: $model) {
        name
        color
        initials
        address
        taxId
        businessId
        vatNumber
    }
  } 
`;

export const CLIENT_GET_QUERY = gql`
    query getClient($id: String!) {
        client(id: $id) {
            id
            name
            color
            initials
            address
            taxId
            businessId
            vatNumber
        }
    } 
`;

export const CLIENT_UPDATE_MUTATION = gql`
mutation updateClient($model:UpdateClientInput!) {
    updateClient(input: $model) {
        id
        name
        color
        initials
        address
        taxId
        businessId
        vatNumber
    }
  } 
`;

export const CLIENT_LIST_QUERY = gql`
    query listClients {
        clients {
            id
            name
            color
            initials
        }
    }
`;
