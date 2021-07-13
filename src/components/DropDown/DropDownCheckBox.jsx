import React from 'react';

export const DropDownCheckBox = (props) => {

    const {
        label,
        checked,
        onChange,
    } = props

    return (
        <div>
            <input
                type='checkbox'
                style={{ marginRight: '5px' }}
                checked={checked}
                onChange={onChange}
            />
            {label}<br />
        </div>
    )
}