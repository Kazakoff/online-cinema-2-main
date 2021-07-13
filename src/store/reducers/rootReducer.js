import authReducer from './authReducer';
import movieReducer from './movieReducer';
import userReducer from './userReducer';
import bookingReducer from './bookingReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

let reducers = combineReducers({
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    movies: movieReducer,
    auth: authReducer,
    booking: bookingReducer,
    users: userReducer,
});

export default reducers;