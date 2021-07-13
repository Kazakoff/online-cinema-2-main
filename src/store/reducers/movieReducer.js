const initialState = {
    movies: []
};

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_MOVIE_SUCCESS':
            return state;
        case 'ADD_MOVIE_ERROR':
            return state;
        case 'DELETE_MOVIE_SUCCESS':
            return state;
        case 'DELETE_MOVIE_ERROR':
            return state;
        case 'EDIT_MOVIE_SUCCESS':
            return { ...state };
        case 'EDIT_MOVIE_ERROR':
            return { ...state };
        default:
            return state;
    }
}
export default movieReducer;
