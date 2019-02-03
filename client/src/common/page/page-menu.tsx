import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const PageMenu = ({ children }: { children: React.ReactNode }) => {
    let elm = document.getElementById('appBarMenu');
    return elm && ReactDOM.createPortal(
        children,
        elm,
    );
};


export default PageMenu;