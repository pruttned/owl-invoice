export interface IQuery<T> {
    id?: string;
    where?: any | ((item: T) => boolean); //TODO: change to sift query
}