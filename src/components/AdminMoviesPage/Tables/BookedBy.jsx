import React, { useEffect } from 'react';
import { usePagination } from '../../../hooks';
import { MovieBody, MovieHead } from '../../MovieForTable';
import { StyleForPagination, PerPage, PageNavigation } from '../../PageNavigation';
import { UserBody, UserHead } from '../../UserForTable';

const BookedBy = (props) => {

    const {
        paginatedArray: users,
        limit,
        setLimit,
        page,
        handleNextPage,
        handlePrevPage,
        setWhere
    } = usePagination('users');

    useEffect(() => {
        setWhere(['bookedMovies', 'array-contains', props.movieId]);
    }, [])

    return (
        <>
            <table className='table table-sm'>
                <thead >
                    <tr>
                        <MovieHead />
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.movies.map(movie =>
                            movie.id === props.movieId &&
                            <tr key={movie.id}>
                                <MovieBody movie={movie} />
                                <td data-title=''>
                                    <button type='button' className='btn whiteBtn w100' onClick={props.handleShowHideUsers}>Hide Users</button>
                                </td>
                            </tr>)
                    }
                </tbody>
            </table>


            <table className='table table-sm'>
                <thead >
                    <tr>
                        <UserHead />
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <UserBody user={user} />
                            </tr>
                        )
                    }
                </tbody>
            </table>


            <StyleForPagination>
                <PageNavigation handlePrevPage={handlePrevPage} page={page} handleNextPage={handleNextPage} />
                <PerPage limit={limit} limitArray={[1, 5, 10]} setLimit={setLimit} initialLimit={5} />
            </StyleForPagination>
        </>
    )
}
export default BookedBy;