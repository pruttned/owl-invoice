import React, { Component } from 'react';
import styles from './form-page.module.scss';
import classNames from 'classnames';
import { Menu } from '@material-ui/core';
import { MenuButton } from '../button/menu-button';
import PageMenu from './page-menu';

interface FormPageProps {
    children: JSX.Element[] | JSX.Element;
    fullWidth?: boolean;
    menuRender?: (closeMenu: () => void) => JSX.Element[];
}
interface FormPageState {
    menuAnchorEl: any;
}


class FormPage extends Component<FormPageProps, FormPageState>{
    state = {
        menuAnchorEl: null,
    };
    openMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        this.setState({
            menuAnchorEl: event.currentTarget,
        });
    }
    closeMenu = () => {
        this.setState({ menuAnchorEl: null });
    };
    render() {
        const { menuAnchorEl } = this.state;

        return (
            <React.Fragment>
                <PageMenu>
                    <MenuButton onClick={this.openMenu} color="inherit" />
                    <Menu open={Boolean(menuAnchorEl)} anchorEl={menuAnchorEl} onClose={this.closeMenu}>
                        {this.props.menuRender && this.props.menuRender(this.closeMenu)}
                    </Menu>
                </PageMenu>
                <div className={classNames(styles.root, { [styles.fullWidth]: this.props.fullWidth })}>{this.props.children}</div>
            </React.Fragment>
        );
    }
}


export default FormPage;