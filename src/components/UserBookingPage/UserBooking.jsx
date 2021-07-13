import React, { useState, useEffect } from 'react';
import { usePagination } from '../../hooks';
import { PerPage, PageNavigation, StyleForPagination } from '../PageNavigation';
import { useFormik } from 'formik';
import { useFirestore } from 'react-redux-firebase';
import { DropDown, DropDownCheckBox } from '../DropDown'
import { MovieHead, MovieBody } from '../MovieForTable';
import { useDispatch, useSelector } from 'react-redux';
import { bookMovie, unbookMovie } from '../../store/actions/bookingActions';
import { getBookedMovies } from '../../store/selectors';

const UserBooking = (props) => {

  const dispatch = useDispatch()
  const bookedMovies = useSelector(getBookedMovies)

  const {
    paginatedArray: movies,
    limit,
    setLimit,
    page,
    handleNextPage,
    handlePrevPage,
    setWhere
  } = usePagination('movies');

  const formik = useFormik({
    initialValues: {
      tags: []
    },
    onSubmit: (values) => {
      if (values.tags.length !== 0) {
        setWhere(['tags', 'array-contains-any', values.tags]);
      }
      else {
        setWhere(null);
      }
    },
  });

  const [showBooked, setShowBooked] = useState(false);

  const [tags, setTags] = useState([])
  const firestore = useFirestore()
  useEffect(() => {
    firestore.collection('availableTags').doc('availableTags').get().then((doc) => {
      setTags(doc.data().tags)
    })
  }, [])

  useEffect(() => {
    if (showBooked) {
      bookedMovies.length ?
        setWhere(['keyword', 'array-contains-any', bookedMovies])
        :
        setWhere(null)
    }
    else {
      formik.values.tags.length !== 0 ?
        setWhere(['tags', 'array-contains-any', formik.values.tags])
        :
        setWhere(null)
    }
  }, [showBooked, bookedMovies.length])

  useEffect(() => {
    bookedMovies.length === 0 &&
      setShowBooked(false)
  }, [bookedMovies.length])

  return (
    <div id='no-more-tables' style={{ width: '100%' }}>

      <StyleForPagination>
        <PageNavigation handlePrevPage={handlePrevPage} page={page} handleNextPage={handleNextPage} />
        <PerPage limit={limit} limitArray={[1, 2, 3, 4]} setLimit={setLimit} initialLimit={3} />
        {
          !showBooked &&
          <DropDown style={{ marginLeft: '7px' }} label='Tags'>
            {
              tags.map(item => {
                return (
                  <DropDownCheckBox
                    key={item}
                    label={item}
                    checked={formik.values.tags.includes(item)}
                    onChange={() => {
                      const set = new Set(formik.values.tags);
                      if (set.has(item)) {
                        set.delete(item);
                      } else {
                        set.add(item);
                      }
                      formik.setFieldValue('tags', Array.from(set))
                      formik.setFieldTouched(item, true);
                      formik.handleSubmit()
                    }}
                  />
                )
              })
            }
          </DropDown>
        }
      </StyleForPagination>


      {
        showBooked ?
          <button type='button' className={`btn w100 whiteBtn`} onClick={() => setShowBooked(false)}>All Movies</button>
          :
          bookedMovies.length !== 0 && <button type='button' className={`btn w100`} onClick={() => setShowBooked(true)}>Only Booked</button>
      }

      <table className='table'>
        <thead>
          <tr>
            <MovieHead />
            <th scope='col'></th>
          </tr>
        </thead>

        <tbody>
          {
            movies.map(movie =>
              <tr key={movie.id}>
                <MovieBody movie={movie} />
                <td className='tdEnd tdFullWidth'>
                  {
                    bookedMovies.find(id => id === movie.id) ?
                      <button type='button' className='btn w100 whiteBtn' onClick={() => { dispatch(unbookMovie(movie.id)) }}>Cancel Booking</button>
                      :
                      <button type='button' className='btn w100' onClick={() => { dispatch(bookMovie(movie.id)) }}>Book</button>
                  }
                </td>
              </tr >
            )
          }
        </tbody>
      </table>

    </div>
  )
}

export default UserBooking;