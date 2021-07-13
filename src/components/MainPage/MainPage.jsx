import React, { useEffect } from 'react';
import './MainPage.css';
import { NavLink } from 'react-router-dom';
import { usePagination } from '../../hooks';
import { PageNavigation, StyleForPagination } from '../PageNavigation';
import { useSelector } from 'react-redux';
import { tagsFormat } from '../../utils';
import { getAuth, getRole } from '../../store/selectors';

const Movies = (props) => {

  const {
    paginatedArray: movies,
    setLimit,
    page,
    handleNextPage,
    handlePrevPage
  } = usePagination('movies');

  useEffect(() => {
    setLimit(5)
  }, [])

  const auth = useSelector(getAuth)
  const role = useSelector(getRole)

  return (
    <div className='row justify-content-center'>
      {
        movies.map(movie =>
          <div className='col d-flex justify-content-center' key={movie.id}>
            <div className='card' >
              <h5 className='card-title'>{movie.title}</h5>
              <img src={movie.image} className='card-img-top' alt='' />
              <div className='card-body'>
                <p className='card-text'>{movie.description}</p>
              </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>
                  {tagsFormat(movie.tags)}
                </li>
              </ul>
              {
                role === 'admin' ||
                <div className='card-body btn'>
                  <NavLink to={auth.uid ? '/booking' : '/sign_in'} className='card-link'>Tickets</NavLink>
                </div>
              }
            </div>
          </div>
        )
      }

      <StyleForPagination>
        <PageNavigation handlePrevPage={handlePrevPage} page={page} handleNextPage={handleNextPage} />
      </StyleForPagination>
    </div>
  )
}
export default Movies;
