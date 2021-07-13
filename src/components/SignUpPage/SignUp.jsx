import React from 'react';
import style from './SignUp.module.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import { useFormik } from 'formik';
import { signUpSchema } from '../../validation';
import { ErrorMessage } from '../ErrorMessage'
import { getAuthError, getUid } from '../../store/selectors';

const SignUp = (props) => {

    const uid = useSelector(getUid)
    const firebaseAuthError = useSelector(getAuthError)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            dispatch(signUp(values));
        },
    });

    if (uid) return <Redirect to='/' />
    return (
        <div className={style.body}>
            <div className={style.header}>
                <h5 className={style.title}>Sign Up</h5>
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
                    <label htmlFor='email' className={style.label}>Email</label>
                    <input className='form-control'
                        id='email'
                        name='email'
                        type='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <ErrorMessage error={formik.errors.email} />
                    <label htmlFor='password' className={style.label}>Password</label>
                    <input className='form-control'
                        id='password'
                        name='password'
                        type='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <ErrorMessage error={formik.errors.password} />
                    <ErrorMessage error={firebaseAuthError} />
                    <br />
                    <button type='submit' className={`btn w100`}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;