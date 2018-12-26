import React, { Component } from 'react';
import ItemList from '../../../common/item-list';
import { MenuItem } from '@material-ui/core';
import styles from './invoice-list.module.scss';
import moment from 'moment';
import { invoiceService } from '../invoice-service';
import { Invoice } from '../invoice';
import Avatar from '../../../common/avatar/avatar';
import { CURRENCY } from '../../constants';


interface InvoiceListProps {
    items: Invoice[]
}

const IssueDateColumn = ({ invoice }: { invoice: Invoice }) => {
    let momentDate = moment(invoice.issueDate);
    let day = momentDate.format('DD');
    let month = momentDate.format('MMM');
    return (
        <div className={`${styles.col} ${styles.dateCol}`}>
            <div className={styles.day}>
                {day}
            </div>
            <div className={styles.month}>
                {month}
            </div>
        </div>
    );
};

const ClientColumn = ({ invoice }: { invoice: Invoice }) => {
    let numberYear = invoice.number.substring(0, 4);
    let numberOrder = invoice.number.substring(4);
    return (
        <div className={`${styles.col} ${styles.clientCol}`}>
            <div className={styles.clientName}>
                {invoice.client.name}
            </div>
            <div className={styles.invoiceNumber}>
                {numberYear}<em>{numberOrder}</em>
            </div>
        </div>
    );
};


const AvatarColumn = ({ invoice }: { invoice: Invoice }) => {
    return (
        <div className={`${styles.col} ${styles.avatarCol}`}>
            <div><Avatar {...invoice.client} /></div>
        </div>
    );
};
const PriceColumn = ({ invoice }: { invoice: Invoice }) => {
    return (
        <div className={`${styles.col} ${styles.priceCol}`}>{invoiceService.getSumPrice(invoice).toString() + CURRENCY}</div>
    );
};


class InvoiceList extends Component<InvoiceListProps> {

    render() {
        return (
            <ItemList<Invoice> items={this.props.items}
                itemRender={(item: Invoice) => (
                    <div className={styles.item}>
                        <IssueDateColumn invoice={item} />
                        <AvatarColumn invoice={item} />
                        <ClientColumn invoice={item} />
                        <PriceColumn invoice={item} />
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