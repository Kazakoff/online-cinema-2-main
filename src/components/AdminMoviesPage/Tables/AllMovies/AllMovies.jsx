import React, { useState, useEffect } from 'react';
import Input from './Input';
import { useFormik } from 'formik';
import { addEditMovieSchema } from '../../../../validation';
import { useFirestore } from 'react-redux-firebase';
import { DropDown, DropDownCheckBox } from '../../../DropDown';
import { MovieBody, MovieHead } from '../../../MovieForTable';
import { ErrorMessage } from '../../../ErrorMessage'
import { addMovie, deleteMovie, editMovie } from '../../../../store/actions/movieActions';
import { useDispatch } from 'react-redux';
import { findByAttr } from '../../../../utils';

const AllMovies = (props) => {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            start: '',
            end: '',
            image: null,
            tags: []
        },
        validationSchema: addEditMovieSchema,
        onSubmit: (values, { resetForm }) => {
            if (values.submitBtn === 'add') {
                delete values.submitBtn
                dispatch(addMovie(values));
            }
            if (values.submitBtn === 'edit') {
                delete values.submitBtn
                dispatch(editMovie(props.movieId, values));
            }
            resetForm();
            setEditMode(false);
            props.setMovieId('');
        },
    });
    const handleSubmit = (e) => {
        formik.setFieldValue('submitBtn', e.target.id)
        formik.handleSubmit()
    };
    const [editMode, setEditMode] = useState(false);
    const handleEdit = (movieId) => {
        const movie = findByAttr(props.movies, 'id', movieId);

        formik.setFieldValue('title', movie.title)
        formik.setFieldValue('description', movie.description)
        formik.setFieldValue('price', movie.price)
        formik.setFieldValue('start', movie.start)
        formik.setFieldValue('end', movie.end)
        formik.setFieldValue('image', movie.image)
        formik.setFieldValue('tags', movie.tags)

        props.setMovieId(movieId);
        setEditMode(true);
    };

    const [tags, setTags] = useState([])
    const firestore = useFirestore()
    useEffect(() => {
        firestore.collection('availableTags').doc('availableTags').get().then((doc) => {
            setTags(doc.data().tags)
        })
    }, [])


    return (
        <>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <MovieHead />
                        <th scope='col'></th>
                        <th scope='col'></th>
                        <th scope='col'></th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.movies.map(movie =>
                            <tr key={movie.id}>
                                <MovieBody movie={movie} />
                                <td className='tdFullWidth'><button type='button' className='btn w100'
                                    onClick={() => { dispatch(deleteMovie(movie.id)) }}>Remove</button></td>
                                <td className='tdFullWidth'><button type='button' className='btn w100 whiteBtn'
                                    onClick={() => { handleEdit(movie.id) }}>Edit</button></td>
                                <td className='tdEnd tdFullWidth'><button type='button' className='btn w100 whiteBtn'
                                    onClick={() => { props.handleShowHideUsers(movie.id) }}>BookedBy</button></td>
                            </tr>
                        )
                    }
                    <tr>
                        <Input type={'text'} placeholder={'Title'} id={'title'}
                            onChange={formik.handleChange} value={formik.values.title}
                            error={formik.errors.title}
                        />
                        <Input type={'text'} placeholder={'Description'} id={'description'}
                            onChange={formik.handleChange} value={formik.values.description}
                            error={formik.errors.description}
                        />
                        <Input type={'text'} placeholder={'Price'} id={'price'}
                            onChange={formik.handleChange} value={formik.values.price}
                            error={formik.errors.price}
                        />
                        <Input type={'date'} id={'start'}
                            onChange={formik.handleChange} value={formik.values.start}
                            error={formik.errors.start}
                        />
                        <Input type={'time'} id={'end'}
                            onChange={formik.handleChange} value={formik.values.end}
                            error={formik.errors.end}
                        />
                        <Input type={'file'} id={'image'}
                            onChange={(e) => { formik.setFieldValue('image', e.currentTarget.files[0]); }}
                            value={formik.values.image}
                            error={formik.errors.image}
                        />

                        <td className='tdFullWidth'>
                            <DropDown style={{ width: '100%' }} label='Tags'>
                                {
                                    tags.map(item => {
                                        return (
                                            <DropDownCheckBox
                                                key={item}
                                                label={item}
                                                checked={formik.values.tags.includes(item)}
                                                onChange={() => {
                                                    const set = new Set(formik.values.tags);
                                                    if (set.has(item)) {
                                                        set.delete(item);
                                                    } else {
                                                        set.add(item);
                                                    }
                                                    formik.setFieldValue('tags', Array.from(set))
                                                    formik.setFieldTouched(item, true);
                                                }}
                                            />
                                        )
                                    })
                                }
                            </DropDown>
                            <ErrorMessage error={formik.errors.tags} />
                        </td>

                        {
                            editMode ?
                                <>
                                    <td className='tdFullWidth' colSpan='2'>
                                        <button id='edit' type='button' className='btn w100'
                                            onClick={handleSubmit}>Edit</button>
                                    </td>
                                    <td className='tdFullWidth'>
                                        <button id='cancel' type='button' className='btn w100 whiteBtn'
                                            onClick={handleSubmit}>Cancel</button>
                                    </td>
                                </>
                                :
                                <td className='tdFullWidth' colSpan='3'>
                                    <button id='add' type='button' className='btn w100'
                                        onClick={handleSubmit}>+add</button>
                                </td>
                        }
                    </tr>
                </tbody>
            </table>
        </>
    )
}
export default AllMovies;