import React from 'react';
import { ErrorMessage } from '../../../ErrorMessage'

const Input = (props) => {

    return (
        <>
            <td className='tdFullWidth'>
                {
                    props.type !== 'file' ?
                        <input
                            className='form-control'
                            type={props.type}
                            placeholder={props.placeholder}
                            id={props.id}
                            onChange={props.onChange}
                            value={props.value}
                        />
                        :
                        <label className='btn w100 whiteBtn'>
                            Image
                        <input
                                type={props.type}
                                style={{ display: 'none' }}
                                id={props.id}
                                onChange={props.onChange} />
                        </label>
                }
                <ErrorMessage error={props.error} />
            </td>
        </>
    )
}
export default Input;
