import { generateKeywords } from '../../utils'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => { dispatch({ type: 'SIGNIN_SUCCESS' }) })
            .catch(err => { dispatch({ type: 'SIGNIN_ERROR', err }) })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signOut()
            .then(() => { dispatch({ type: 'SIGNOUT_SUCCESS' }) })
    }
}

export const signUp = (newUser) => {
    let keywords = [];
    generateKeywords(newUser.firstName.toLowerCase() + ' ' + newUser.lastName.toLowerCase() + ' ' + newUser.email.toLowerCase(), keywords);

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const time = Date.now()
        firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((response) => {
                return firestore
                    .collection('users')
                    .doc(response.user.uid)
                    .set({
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        role: 'user',
                        bookedMovies: [],
                        time: time,
                        keywords
                    })
            })
            .then(() => { dispatch({ type: 'SIGNUP_SUCCESS' }) })
            .catch(err => {
                console.log(err)
                dispatch({ type: 'SIGNUP_ERROR', err })
            })
    }
}