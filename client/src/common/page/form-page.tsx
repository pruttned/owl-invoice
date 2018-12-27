import React from 'react';
import styles from './form-page.module.scss';

const FormPage = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className={styles.root}>{children}</div>
    );
};

export default FormPage;