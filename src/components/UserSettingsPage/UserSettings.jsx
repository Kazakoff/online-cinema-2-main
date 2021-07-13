import React from 'react';
import style from './UserSettings.module.css';
import { useFormik } from 'formik';
import { settingsSchema } from '../../validation';
import { ErrorMessage } from '../ErrorMessage'
import { useDispatch, useSelector } from 'react-redux';
import { changeName, removeRequest } from '../../store/actions/settingsActions';
import { getFirstName, getLastName, getRemoveRequestStatus } from '../../store/selectors';

const UserSettings = (props) => {

    const dispatch = useDispatch()
    const firstName = useSelector(getFirstName)
    const lastName = useSelector(getLastName)
    const removeRequestBool = useSelector(getRemoveRequestStatus)

    const formik = useFormik({
        initialValues: {
            firstName: firstName,
            lastName: lastName
        },
        validationSchema: settingsSchema,
        onSubmit: (values) => {
            dispatch(changeName(values));
        },
    });

    return (
        <div className={style.body}>
            <div className={style.header}>
                <h5 className={style.title}>Settings</h5>
            </div>
            <br />
            <div className={style.main}>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor='firstName' className={style.label}>First Name</label>
                    <input className='form-control'
                        id='firstName'
                        name='firstName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    <ErrorMessage error={formik.errors.firstName} />
                    <label htmlFor='lastName' className={style.label}>Last Name</label>
                    <input className='form-control'
                        id='lastName'
                        name='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    <ErrorMessage error={formik.errors.lastName} />
                    <button type='submit' className={`btn w100 ${style.saveBtn}`}>Save Changes</button>
                </form>
            </div>
            <br />
            <br />
            <div className={style.footer}>
                {
                    removeRequestBool ?
                        <p style={{ textAlign: 'center' }}>Your account will be deleted soon</p>
                        :
                        <button type='button' className={`btn w100 ${style.removeBtn}`} onClick={() => dispatch(removeRequest())}>Account Deletion Request</button>
                }
            </div>
        </div>
    )
}

export default UserSettings;
