import gql from "graphql-tag";

export const REPO_PULL_MUTATION = gql`
mutation pullRepo {
    pullRepo {
        files,
        changes,
        insertions,
        deletions
    }
  } 
`;