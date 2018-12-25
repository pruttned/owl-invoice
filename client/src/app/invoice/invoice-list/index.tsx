import React, { Component } from 'react';
import ItemList from '../../../common/item-list';
import { MenuItem } from '@material-ui/core';
import styles from './invoice-list.module.scss';
import moment from 'moment';
import { invoiceService } from '../invoice-service';
import { Invoice } from '../invoice';


interface InvoiceListProps {
    items: Invoice[]
}

const DateColumn = ({ date }: { date: Date }) => {
    let momentDate = moment(date);
    let day = momentDate.format('DD');
    let month = momentDate.format('MMM');
    return (
        <div className={styles.dateCol}>
            <div>
                {day}
            </div>
            <div>
                {month}
            </div>
        </div>
    );
};

const ClientColumn = ({ invoice }: { invoice: Invoice }) => {
    let numberYear = invoice.number.substring(0, 4);
    let numberOrder = invoice.number.substring(4);
    return (
        <div className={styles.dateCol}>
            <div>
                {numberYear}<em>{numberOrder}</em>
            </div>
            <div>
                {invoice.client.name}
            </div>
        </div>
    );
};

class InvoiceList extends Component<InvoiceListProps> {

    render() {
        return (
            <ItemList<Invoice> items={this.props.items}
                itemRender={(item: Invoice) => (
                    <div className={styles.item}>
                        <div className={styles.itemCol}><DateColumn date={item.issueDate} /></div>
                        <div className={styles.itemCol}><ClientColumn invoice={item} /></div>
                        <div className={styles.itemCol}>{invoiceService.getSumPrice(item).toString()}</div>
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

export default InvoiceList;