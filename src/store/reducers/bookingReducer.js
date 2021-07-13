const initialState = {};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOK_MOVIE_SUCCESS':
            return { ...state }
        case 'BOOK_MOVIE_ERROR':
            return { ...state }
        case 'UNBOOK_MOVIE_SUCCESS':
            return { ...state }
        case 'UNBOOK_MOVIE_ERROR':
            return { ...state }
        default:
            return state;
    }
}
export default bookingReducer;
