import * as Yup from 'yup';

export const signUpSchema = () => Yup.object().shape({
    firstName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[aA-zZ\s]+$/, 'Letters only')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .matches(/^[aA-zZ\s]+$/, 'Letters only')
        .required('Required'),
    email: Yup.string()
        .email('Wrong email format. Example: user@email.com')
        .required('Required'),
    password: Yup.string()
        .min(6, 'At least 6 characters')
        .required('Required'),
})