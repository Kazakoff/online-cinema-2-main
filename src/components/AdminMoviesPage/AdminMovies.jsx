import React, { useState } from 'react';
import { usePagination } from '../../hooks';
import { PerPage, PageNavigation, StyleForPagination } from '../PageNavigation';
import AllMovies from './Tables/AllMovies/AllMovies';
import BookedBy from './Tables/BookedBy';

const AdminMovies = (props) => {

    const {
        paginatedArray: movies,
        limit,
        setLimit,
        page,
        handleNextPage,
        handlePrevPage
    } = usePagination('movies');

    const [movieId, setMovieId] = useState('');
    const [showUsers, setShowUsers] = useState(false);

    const handleShowHideUsers = (movieId) => {
        if (showUsers) {
            setShowUsers(false);
            setMovieId('');
        } else {
            setShowUsers(true);
            setMovieId(movieId);
        }
    };

    return (
        <div id='no-more-tables' style={{ width: '100%' }}>
            {
                showUsers ?
                    <BookedBy
                        movies={movies}
                        movieId={movieId}
                        handleShowHideUsers={handleShowHideUsers}
                    />
                    :
                    <>
                        <StyleForPagination>
                            <PageNavigation handlePrevPage={handlePrevPage} page={page} handleNextPage={handleNextPage} />
                            <PerPage limit={limit} limitArray={[1, 2, 3, 4]} setLimit={setLimit} initialLimit={3} />
                        </StyleForPagination>

                        <AllMovies
                            movies={movies}
                            movieId={movieId}
                            handleShowHideUsers={handleShowHideUsers}
                            setMovieId={setMovieId}
                        />
                    </>
            }
        </div>
    )

}
export default AdminMovies