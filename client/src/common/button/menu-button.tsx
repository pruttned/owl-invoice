import React, { Component } from 'react';
import { IconButton, PropTypes } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import { Item } from '../item-list/item-list';

interface MenuButtonProps<T extends Item> {
    color?: PropTypes.Color;
    target?: T;
    onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>, target?: T) => void;
}

export class MenuButton<T extends Item> extends Component<MenuButtonProps<T>> {
    onButtonClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.props.onClick(event, this.props.target);
    };
    render() {
        return (
            <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.onButtonClick}
                color={this.props.color}
            >
                <MoreVertIcon />
            </IconButton>);
    }
}
