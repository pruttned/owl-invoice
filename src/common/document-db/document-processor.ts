import { Document } from './document';

export interface DocumentProcessor<T extends Document> {
    fromDb(document: T): T;
    toDb(document: T): any;
}
