import React from 'react';
import { Avatar as MtAvatar } from '@material-ui/core';

const Avatar = (props: { color: string, initials: string }) => {
    let style = {
        backgroundColor: props.color
    };
    return (
        <div>
            <MtAvatar style={style}>{props.initials}</MtAvatar>
        </div>
    );
};

export default Avatar;