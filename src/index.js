import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer'
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase'
import firebaseConfig from './config/firebaseConfig'
import firebase from 'firebase/app'
import { getAuth } from './store/selectors';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
  )
);

const config = {
  userProfile: 'users', // where profiles are stored in database 
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions',
  useFirestoreForProfile: true
};

const rrfProps = {
  firebase,
  config,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(getAuth)
  if (!isLoaded(auth)) return null;
  return children
}

ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </ReactReduxFirebaseProvider>
      </Provider>
    </BrowserRouter>,
  document.getElementById('root')
);



