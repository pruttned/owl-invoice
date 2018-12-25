import React, { Component } from 'react';
import ItemList from '../../../common/item-list';
import { MenuItem } from '@material-ui/core';
import styles from './invoice-list.module.scss';

const items = [
    { id: 1, amount: '22', date: 'd1' },
    { id: 2, amount: '33', date: 'd2' },
]

interface InvoiceItem {
    id: string;
    date: string;
    amount: string;
}
interface InvoiceListProps {
    items: InvoiceItem[]
}

class InvoiceList extends Component<InvoiceListProps> {

    render() {
        return (
            <ItemList items={items}
                itemRender={(item: InvoiceItem) => (
                    <div className={styles.item}>
                        <div className={styles.itemCol}>{item.date}</div>
                        <div className={styles.itemCol}>{item.amount}</div>
                    </div>
                )}
                menuRender={(item: any, closeMenu: () => void) => [
                    <MenuItem onClick={() => { console.log(item); closeMenu(); }}>action1 {item.name}</MenuItem>,
                    <MenuItem onClick={() => { console.log(item); closeMenu(); }}>action2 {item.name}</MenuItem>,
                ]}
            />
        );
    }
}

export default InvoiceList;