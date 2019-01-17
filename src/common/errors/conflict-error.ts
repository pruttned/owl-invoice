import { ApolloError } from "apollo-server-core";

export class ConflictError extends ApolloError {
    constructor(message: string, properties?: Record<string, any>) {
        super(message, 'CONFLICT', properties);
    }
}