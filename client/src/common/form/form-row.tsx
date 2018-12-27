import React from 'react';
import styles from './form-row.module.scss';

const FormRow = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
    return (
        <div className={styles.root}>{children}</div>
    );
};

export default FormRow;