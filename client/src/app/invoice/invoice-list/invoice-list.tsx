import React, { Component } from 'react';
import ItemList from '../../../common/item-list/item-list';
import { MenuItem } from '@material-ui/core';
import styles from './invoice-list.module.scss';
import moment from 'moment';
import { invoiceService } from '../invoice-service';
import { Invoice } from '../invoice';
import Avatar from '../../../common/avatar/avatar';
import { CURRENCY } from '../../constants';
import { groupBy, map } from 'lodash';
import Decimal from 'decimal.js';

interface InvoiceListProps {
    items: Invoice[];
    menuRender: (item: Invoice, closeMenu: () => void) => JSX.Element[];
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
    let numberYear = invoice.id.substring(0, 4);
    let numberOrder = invoice.id.substring(4);
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

const GroupHeader = ({ group }: { group: { title: string, value: Decimal } }) => {
    return (
        <div className={styles.groupHeader}>
            <span>{group.title}</span>
            <span>{group.value.toString() + CURRENCY}</span>
        </div>
    );
};

class InvoiceList extends Component<InvoiceListProps> {

    render() {
        let invoicesByMonth = groupBy(this.props.items, (item: Invoice) => item.issueDate.getMonth());
        let groups = map(invoicesByMonth, invoices => ({
            title: moment(invoices[0].issueDate).format('MMMM YYYY'),
            value: invoiceService.getSumPrice(invoices),
            items: invoices
        }));

        return (
            <div className={styles.root}>
                {
                    groups.map(group => (
                        <React.Fragment key={group.title}>
                            <GroupHeader group={group} />

                            <ItemList<Invoice> items={group.items}
                                itemUrl={(item: Invoice) => `/invoices/${encodeURIComponent(item.id)}`}
                                itemRender={(item: Invoice) => (
                                    <div className={styles.item}>
                                        <IssueDateColumn invoice={item} />
                                        <AvatarColumn invoice={item} />
                                        <ClientColumn invoice={item} />
                                        <PriceColumn invoice={item} />
                                    </div>
                                )}
                                menuRender={this.props.menuRender}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
        );
    }
}

export default InvoiceList;