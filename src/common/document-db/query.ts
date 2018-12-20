export interface IdQuery {
    id?: string;
}

export interface Query<T> extends IdQuery {
    where?: any | ((item: T) => boolean); //TODO: change to sift query
}