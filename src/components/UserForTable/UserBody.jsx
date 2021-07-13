import React from 'react';

export const UserBody = (props) => {

    return (
        <>
            <td data-title='First Name'>{props.user.firstName}</td>
            <td data-title='Last Name'>{props.user.lastName}</td>
            <td data-title='Email'>{props.user.email}</td>
        </>
    )
}