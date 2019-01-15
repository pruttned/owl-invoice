
import React from 'react';
import styles from './page-fab.module.scss';
import { Fab } from '@material-ui/core';


interface PageFabProps {
    onClick: () => void;
    children: React.ReactNode;
};

const PageFab = (props: PageFabProps) => (
    <aside className={styles.root}>
        <Fab color='primary' onClick={props.onClick}>
            {props.children}
        </Fab>
    </aside>
)

export default PageFab;