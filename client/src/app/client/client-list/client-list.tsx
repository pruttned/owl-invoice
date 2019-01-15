import React, { Component } from 'react';
import ItemList from '../../../common/item-list/item-list';
import styles from './client-list.module.scss';
import { Client } from '../client';
import Avatar from '../../../common/avatar/avatar';

interface ClientListProps {
    items: Client[],
    menuRender: (item: Client, closeMenu: () => void) => JSX.Element[];
}

const ClientColumn = ({ client }: { client: Client }) => {
    return (
        <div className={`${styles.col} ${styles.clientCol}`}>
            {client.name}
        </div>
    );
};

const AvatarColumn = ({ client }: { client: Client }) => {
    return (
        <div className={`${styles.col} ${styles.avatarCol}`}>
            <div><Avatar {...client} /></div>
        </div>
    );
};

const ClientList = (props: ClientListProps) =>
    (
        <ItemList<Client> items={props.items}
            itemUrl={(item: Client) => `/clients/${encodeURIComponent(item.id)}`}
            itemRender={(item: Client) => (
                <div className={styles.item}>
                    <AvatarColumn client={item} />
                    <ClientColumn client={item} />
                </div>
            )}
            menuRender={props.menuRender}
        />
    );


export default ClientList;