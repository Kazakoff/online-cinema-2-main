import React from 'react';
import style from './SignIn.module.css';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { useFormik } from 'formik';
import { signInSchema } from '../../validation';
import { ErrorMessage } from '../ErrorMessage'
import { getAuthError, getUid } from '../../store/selectors';

const SignIn = (props) => {

    const uid = useSelector(getUid)
    const firebaseAuthError = useSelector(getAuthError)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: signInSchema,
        onSubmit: (values) => {
            dispatch(signIn(values));
        },
    });

    if (uid) return <Redirect to='/' />
    return (
        <div className={style.body}>
            <div className={style.header}>
                <h5 className={style.title}>Sign In</h5>
            </div>
            <br />
            <div className={style.main}>
                <form onSubmit={formik.handleSubmit}>
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
                    <button type='submit' className={`btn w100`}>Sign In</button>
                </form>
            </div>
        </div>
    )
};

export default SignIn;