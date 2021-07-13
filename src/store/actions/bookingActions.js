export const bookMovie = (movieId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();

        firestore
            .collection('users')
            .doc(state.firebase.auth.uid)
            .update({
                bookedMovies: state.firebase.profile.bookedMovies ?
                    [...state.firebase.profile.bookedMovies, movieId] : [movieId]
            })
            .then(() => { dispatch({ type: 'BOOK_MOVIE_SUCCESS' }) })
            .catch(err => { dispatch({ type: 'BOOK_MOVIE_ERROR', err }) })

    }
}
export const unbookMovie = (movieId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();

        let movies = [...state.firebase.profile.bookedMovies]
        movies.splice(movies.indexOf(movieId), 1)

        firestore
            .collection('users')
            .doc(state.firebase.auth.uid)
            .update({ bookedMovies: movies && [...movies] })
            .then(() => { dispatch({ type: 'UNBOOK_MOVIE_SUCCESS' }) })
            .catch(err => { dispatch({ type: 'UNBOOK_MOVIE_ERROR', err }) })
    }
}