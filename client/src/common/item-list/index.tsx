import React, { Component } from 'react';
import { Menu, MenuItem, Button, ListItemIcon, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import styles from './item-list.module.scss';

interface ItemListMenuItem {

}

interface ItemListProps {
    items: any[],
    itemRender: (item: any) => JSX.Element,
    menuRender: (item: any, closeMenu: () => void) => JSX.Element[],
}
interface ItemListState {
    anchorEl: any,
    menuActiveForItem: any
}


interface MenuButtonProps {
    item: any,
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, item: any) => void
}

class MenuButton extends Component<MenuButtonProps> {
    handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.props.onClick(event, this.props.item);
    };

    render() {
        return (
            <IconButton className={styles.menuButton}
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
            >
                <MoreVert />
            </IconButton>
        );
    }
}

class ItemList extends Component<ItemListProps, ItemListState> {
    state = {
        anchorEl: null,
        menuActiveForItem: null
    };
    handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    onMenuClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, item: any) => {
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
                        <div className={styles.item}>
                            <div className={styles.itemContent}>

                                {this.props.itemRender(item)}
                            </div>

                            <MenuButton onClick={this.onMenuClick} item={item} />
                        </div>))
                }
                <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.closeMenu}>
                    {this.state.menuActiveForItem && this.props.menuRender(this.state.menuActiveForItem, this.closeMenu)}
                </Menu>
            </div>
        );
    }
}

export default ItemList;