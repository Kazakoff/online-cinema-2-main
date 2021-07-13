import React, { useRef, useState, useEffect } from 'react';

export const DropDown = (props) => {

    const {
        label,
        children,
        style,
    } = props

    const [menuSize, setMenuSize] = useState('auto')
    const buttonRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current && menuRef.current) {
            setMenuSize(handleCompareSize)
        }
    }, [buttonRef.current?.offsetWidth, menuRef.current?.offsetWidth])

    const handleCompareSize = () => {
        if (buttonRef.current.offsetWidth > menuRef.current.offsetWidth) {
            return buttonRef.current.offsetWidth
        } else {
            return 'auto'
        }
    }

    return (
        <div className={'btn-group dropdown'} style={style}>

            <button ref={buttonRef} type='button' className='btn whiteBtn dropdown-toggle'
                data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>{label}</button>


            <div ref={menuRef} className='dropdown-menu' style={{ minWidth: menuSize }} >
                <div style={{ height: children.length > 6 ? '155px' : 'auto', overflowY: 'auto', whiteSpace: 'nowrap', paddingRight: '5px', marginLeft: '5px' }}>
                    {children}
                </div>
            </div>

        </div>
    )
}