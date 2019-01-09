import ApolloClient from "apollo-client";

export class AppStore {
    constructor(private client: ApolloClient<any>) {
    }

    invalidateQueryCache() {
        //keep local state
        this.client.resetStore();
    }
}