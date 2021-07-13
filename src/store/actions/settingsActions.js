import { generateKeywords } from '../../utils'

export const changeName = (newName) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();
        let keywords = [];
        generateKeywords(newName.firstName.toLowerCase() + ' ' + newName.lastName.toLowerCase() + ' ' + state.firebase.profile.email.toLowerCase(), keywords)

        firestore
            .collection('users')
            .doc(state.firebase.auth.uid)
            .update({
                firstName: newName.firstName,
                lastName: newName.lastName,
                keywords
            })
            .then(() => { dispatch({ type: 'CHANGE_NAME_SUCCESS' }) })
            .catch(err => { dispatch({ type: 'CHANGE_NAME_ERROR', err }) })
    }
}
export const removeRequest = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const state = getState();

        firestore
            .collection('users')
            .doc(state.firebase.auth.uid)
            .update({ removeRequest: true })
            .then(() => { dispatch({ type: 'REMOVE_REQUEST_SUCCESS' }) })
            .catch(err => { dispatch({ type: 'REMOVE_REQUEST_ERROR', err }) })
    }
}