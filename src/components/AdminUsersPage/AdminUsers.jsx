import React from 'react';
import { useFormik } from 'formik';
import { usePagination } from '../../hooks';
import { PerPage, PageNavigation, StyleForPagination } from '../PageNavigation';
import { UserHead, UserBody } from '../UserForTable';
import { deleteUser } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';

const AdminUsers = (props) => {

    const dispatch = useDispatch()

    const {
        paginatedArray: users,
        limit,
        setLimit,
        page,
        handleNextPage,
        handlePrevPage,
        setWhere
    } = usePagination('users');

    const formik = useFormik({
        initialValues: {
            keywords: ''
        },
        onSubmit: (values) => {
            if (values.keywords.length !== 0) {
                setWhere(['keywords', 'array-contains-any', [formik.values.keywords.toLowerCase()]]);
            }
            else {
                setWhere(null);
            }
        },
    });

    return (
        <div id='no-more-tables' style={{ width: '100%' }}>

            <StyleForPagination>
                <PageNavigation handlePrevPage={handlePrevPage} page={page} handleNextPage={handleNextPage} />
                <PerPage limit={limit} limitArray={[5, 10, 15]} setLimit={setLimit} />
                <form onSubmit={formik.handleSubmit} className='d-flex'>
                    <input
                        className='form-control'
                        style={{ maxWidth: '400px', marginLeft: '7px' }}
                        id='keywords'
                        type='text'
                        placeholder='Email or Name'
                        value={formik.values.keywords}
                        onChange={formik.handleChange}
                    />
                    <button type='submit' className='btn'>Search</button>
                </form>
            </StyleForPagination>

            <table className='table table-sm'>
                <thead>
                    <tr>
                        <UserHead />
                        <th scope='col'>Remove request</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => {
                            return (
                                <tr key={user.id}>
                                    <UserBody user={user} />
                                    {
                                        user.removeRequest
                                            ?
                                            <td className='tdEnd tdFullWidth'>
                                                <button
                                                    type='button'
                                                    className={`btn w100`}
                                                    onClick={() => { dispatch(deleteUser(user.id)) }}
                                                >Remove user</button>
                                            </td>
                                            :
                                            <td className='tdEnd' data-title='Remove request'>-</td>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}
export default AdminUsers;