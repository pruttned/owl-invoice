import React, { Component } from 'react';
import { Menu, IconButton, } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import styles from './item-list.module.scss';

interface Item {
    id: string;
}
interface ItemListProps<T extends Item> {
    items: T[];
    itemRender: (item: T) => JSX.Element;
    menuRender: (item: T, closeMenu: () => void) => JSX.Element[];
}
interface ItemListState<T extends Item> {
    anchorEl: any;
    menuActiveForItem: T | null;
}

interface MenuButtonProps<T extends Item> {
    item: T;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, item: T) => void;
}

class MenuButton<T extends Item> extends Component<MenuButtonProps<T>> {
    onButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.props.onClick(event, this.props.item);
    };

    render() {
        return (
            <IconButton className={styles.menuButton}
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.onButtonClick}
            >
                <MoreVertIcon />
            </IconButton>
        );
    }
}

class ItemList<T extends Item> extends Component<ItemListProps<T>, ItemListState<T>> {
    state = {
        anchorEl: null,
        menuActiveForItem: null
    };

    onMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: T) => {
        this.setState({
            anchorEl: event.currentTarget,
            menuActiveForItem: item
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
                        <div key={item.id} className={styles.item}>
                            <div className={styles.itemContent}>
                                {this.props.itemRender(item)}
                            </div>

                            <MenuButton onClick={this.onMenuClick} item={item} />
                        </div>))
                }
                <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.closeMenu}>
                    {this.state.menuActiveForItem && this.props.menuRender(this.state.menuActiveForItem!, this.closeMenu)}
                </Menu>
            </div>
        );
    }
}

export default ItemList;