import React, { Component } from 'react';
import ItemList from '../../../common/item-list/item-list';
import { MenuItem } from '@material-ui/core';
import styles from './client-list.module.scss';
import { Client } from '../client';
import Avatar from '../../../common/avatar/avatar';
import { Link } from 'react-router-dom';

interface ClientListProps {
    items: Client[]
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

class ClientList extends Component<ClientListProps> {
    render() {
        return (
            <ItemList<Client> items={this.props.items}
                itemUrl={(item: Client) => `/clients/${encodeURIComponent(item.id)}`}
                itemRender={(item: Client) => (
                    <div className={styles.item}>
                        <AvatarColumn client={item} />
                        <ClientColumn client={item} />
                    </div>
                )}
                menuRender={(item: any, closeMenu: () => void) => [
                    <MenuItem key="m1" onClick={() => { console.log(item); closeMenu(); }}>action1 {item.name}</MenuItem>,
                    <MenuItem key="m2" onClick={() => { console.log(item); closeMenu(); }}>action2 {item.name}</MenuItem>,
                ]}
            />
        );
    }
}

export default ClientList;