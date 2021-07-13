import * as Yup from 'yup';

export const addEditMovieSchema = () => Yup.object().shape({
    title: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    description: Yup.string()
        .min(1, 'Too Short!')
        .required('Required'),
    price: Yup.string()
        .matches(/^\$(([1-9]\d{0,2}(,\d{3})*)|(([1-9]\d*)?\d))(\.\d\d)?$/, 'Allowed formats: $1, $1.10')
        .required('Required'),
    start: Yup.string()
        .required('Required'),
    end: Yup.string()
        .required('Required'),
    image: Yup.lazy(value => {
        switch (typeof value) {
            case 'object':
                return Yup.mixed()
                    .required('Required')
                    .test('fileFormat', 'jpg, jpeg and png formats only', value => { return value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type) })
            case 'string':
                return Yup.string().url('Bad URL format').required('Required')
            default:
                return
        }
    }),
    tags: Yup.array()
        .min(1, 'Required')
})