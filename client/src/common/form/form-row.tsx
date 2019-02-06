import React from 'react';
import styles from './form-row.module.scss';
import classNames from 'classnames';

const FormRow = ({ children, fullWidth }: { children: JSX.Element[] | JSX.Element, fullWidth?: boolean }) => {
    return (
        <div className={classNames(styles.root, { [styles.fullWidth]: fullWidth })}>{children}</div>
    );
};

export default FormRow;