const initialState = {};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_NAME_SUCCESS':
            return { ...state };
        case 'CHANGE_NAME_ERROR':
            return { ...state }
        case 'REMOVE_REQUEST_SUCCESS':
            return { ...state }
        case 'REMOVE_REQUEST_ERROR':
            return { ...state }
        default:
            return state;
    }
}

export default settingsReducer;