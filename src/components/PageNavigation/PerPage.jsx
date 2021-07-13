import React, { useRef, useEffect } from 'react';
import { DropDown } from '../DropDown';

export const PerPage = (props) => {

  const {
    limitArray,
    setLimit,
    limit,
    initialLimit
  } = props

  useEffect(() => {
    setLimit(initialLimit ? initialLimit : limitArray[0])
  }, [])

  return (
    <DropDown style={{ marginLeft: '7px' }} label={limit}>
      {
        limitArray.map(item => {
          return (
            <div
              key={item}
              className='d-flex justify-content-center w100'
              style={limit === item ? { backgroundColor: '#ccc', borderRadius: '100%' } : { cursor: 'pointer' }}
              onClick={() => setLimit(item)} >
              {item}
            </div>
          )
        })
      }
    </DropDown>
  )
}
