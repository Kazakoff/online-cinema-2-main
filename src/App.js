import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';
import { getRole } from './store/selectors';

import Header from './components/Header';
import Footer from './components/Footer';

import Main from './components/MainPage';

import UserBooking from './components/UserBookingPage';
import UserSettings from './components/UserSettingsPage';

import AdminMovies from './components/AdminMoviesPage';
import AdminUsers from './components/AdminUsersPage';

import SignUp from './components/SignUpPage';
import SignIn from './components/SignInPage';


function RoleIsLoaded({ children }) {
  const role = useSelector(getRole)
  if (!isLoaded(role)) return null;
  return children
}

const App = (props) => {

  const role = useSelector(getRole)

  return (
    <div className='app'>
      <Header />
      <div className='content'>
        <Route exact path='/' render={() => <Main />} />

        <RoleIsLoaded>
          {
            role === 'admin' ?
              <>
                <Route path='/admin_movies' render={() => <AdminMovies />} />
                <Route path='/admin_users' render={() => <AdminUsers />} />
              </>
              :
              <>
                <Route path='/booking' render={() => <UserBooking />} />
                <Route path='/settings' render={() => <UserSettings />} />
              </>
          }
        </RoleIsLoaded>

        <Route path='/sign_in' render={() => <SignIn />} />
        <Route path='/sign_up' render={() => <SignUp />} />
      </div>
      <Footer />
    </div>
  );
}

export default App
