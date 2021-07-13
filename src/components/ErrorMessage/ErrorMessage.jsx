import React from 'react';

export const ErrorMessage = (props) => {
    return (
        props.error ?
            <p style={{ color: 'red', fontSize: '12px', fontWeight: '400' }} >{props.error}</p>
            :
            null
    )
}