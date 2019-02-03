import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Breadcrumbs as BreadcrumbsDynamic } from 'react-breadcrumbs-dynamic';
import styles from './breadcrumbs.module.scss';

const BreadcrumbsLink = (props: LinkProps) => (
    <Link {...props}>
        <span className={styles.link}>
            {props.children}
        </span>
    </Link>
);

const Breadcrumbs = () => (
    <BreadcrumbsDynamic
        separator={<span> &gt; </span>}
        item={BreadcrumbsLink}
        finalItem={'span'}
    />
);

export default Breadcrumbs;



