import ApolloClient, { ApolloQueryResult } from "apollo-client";

export class AppStore {
    constructor(private client: ApolloClient<any>) {
    }

    invalidateQueryCache(): Promise<any> {
        //keep local state
        return this.client.clearStore();
    }
}