import produce from 'immer'

const initialState = {
    authError: null
};

const authReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'SIGNUP_SUCCESS':
                draft.authError = null
                return
            case 'SIGNUP_ERROR':
                draft.authError = action.err.message
                return
            case 'SIGNIN_SUCCESS':
                draft.authError = null
                return
            case 'SIGNIN_ERROR':
                draft.authError = action.err.message
                return
            case 'SIGNOUT_SUCCESS':
                return state;
            default:
                return state;
        }
    })
}
export default authReducer;
