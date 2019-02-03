import React, { Component } from 'react';
import { Menu, } from '@material-ui/core';
import styles from './item-list.module.scss';
import { Link } from 'react-router-dom';
import { MenuButton } from '../button/menu-button';

export interface Item {
    id: string;
}
interface ItemListProps<T extends Item> {
    items: T[];
    highlightedItem?: T;
    itemUrl: (item: T) => string;
    itemRender: (item: T) => JSX.Element;
    menuRender: (item: T, closeMenu: () => void) => JSX.Element[];
}
interface ItemListState<T extends Item> {
    anchorEl: any;
    menuActiveForItem: T | null;
}

class ItemList<T extends Item> extends Component<ItemListProps<T>, ItemListState<T>> {
    state = {
        anchorEl: null,
        menuActiveForItem: null
    };

    openMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>, target?: T) => {
        this.setState({
            anchorEl: event.currentTarget,
            menuActiveForItem: target!
        });
    }
    closeMenu = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;
        return (
            <div className={styles.root}>
                {
                    this.props.items.map(item => (
                        <div key={item.id} className={`${styles.item} ${item === this.props.highlightedItem && styles.itemHighlighted}`}>
                            <Link to={this.props.itemUrl(item)} className={styles.itemContent}>
                                {this.props.itemRender(item)}
                            </Link>

                            <div className={styles.menuButtonCol}>
                                <MenuButton onClick={this.openMenu} target={item} />
                            </div>
                        </div>))
                }
                <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.closeMenu}>
                    {this.state.menuActiveForItem && this.props.menuRender(this.state.menuActiveForItem!, this.closeMenu)}
                </Menu>
            </div >
        );
    }
}

export default ItemList;