import React from 'react';
import styles from './form-page.module.scss';
import classNames from 'classnames';

const FormPage = ({ children, fullWidth }: { children: JSX.Element[] | JSX.Element, fullWidth?: boolean }) => {
    return (
        <div className={classNames(styles.root, { [styles.fullWidth]: fullWidth })}>{children}</div>
    );
};

export default FormPage;