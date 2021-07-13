export const addMovie = (movie) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const storage = getFirebase().storage();

        const img = movie.image
        movie.image = null
        const time = Date.now()
        firestore
            .collection('movies')
            .add({ ...movie, time })
            .then((response) => {
                img &&
                    storage
                        .ref(`images/${response.id}`)
                        .put(img)
                        .on(
                            'state_changed',
                            snapshot => { },
                            error => { console.log(error) },
                            () => {
                                storage
                                    .ref('images')
                                    .child(response.id)
                                    .getDownloadURL()
                                    .then(url => {
                                        movie.image = url
                                        return firestore
                                            .collection('movies')
                                            .doc(response.id)
                                            .update({ image: movie.image,
                                                keyword: [response.id]
                                             })
                                    })
                            }
                        )
            })
            .then(() => { dispatch({ type: 'ADD_MOVIE_SUCCESS' }) })
            .catch((err) => { dispatch({ type: 'ADD_MOVIE_ERROR', err }) })
    }
}

export const deleteMovie = (movieId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const storage = getFirebase().storage();

        firestore
            .collection('movies')
            .doc(movieId)
            .get()
            .then((doc) => {
                firestore
                    .collection('movies')
                    .doc(movieId)
                    .delete()
                    .then(() => {
                        doc.data().image &&
                            storage
                                .ref(`images/${movieId}`)
                                .delete()
                    })
            })
            .then(() => { dispatch({ type: 'DELETE_MOVIE_SUCCESS' }) })
            .catch((err) => { dispatch({ type: 'DELETE_MOVIE_ERROR', err }) })
    }
}

export const editMovie = (movieId, newMovieText) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const storage = getFirebase().storage();
        typeof newMovieText.image !== 'string' && newMovieText.image
            ?
            storage
                .ref('images')
                .child(movieId)
                .put(newMovieText.image)
                .on(
                    'state_changed',
                    snapshot => { },
                    error => { console.log(error) },
                    () => {
                        storage
                            .ref('images')
                            .child(movieId)
                            .getDownloadURL()
                            .then(url => {
                                newMovieText.image = url
                                return firestore
                                    .collection('movies')
                                    .doc(movieId)
                                    .update({
                                        ...newMovieText
                                    })
                            })
                            .then(() => { dispatch({ type: 'EDIT_MOVIE_SUCCESS' }) })
                            .catch(err => { dispatch({ type: 'EDIT_MOVIE_ERROR', err }) })
                    }
                )
            :
            firestore
                .collection('movies')
                .doc(movieId)
                .update({
                    ...newMovieText
                })
                .then(() => { dispatch({ type: 'EDIT_MOVIE_SUCCESS' }) })
                .catch(err => { dispatch({ type: 'EDIT_MOVIE_ERROR', err }) })
    }
}

