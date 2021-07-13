import * as Yup from 'yup';

export const signInSchema = () => Yup.object().shape({
    email: Yup.string()
        .email('Wrong email format. Example: user@email.com')
        .required('Required'),
    password: Yup.string()
        .min(6, 'At least 6 characters')
        .required('Required'),
})