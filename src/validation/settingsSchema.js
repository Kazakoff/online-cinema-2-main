import * as Yup from 'yup';

export const settingsSchema = () => Yup.object().shape({
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
})