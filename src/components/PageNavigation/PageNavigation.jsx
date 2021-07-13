import React from 'react';

export const PageNavigation = (props) => {

  const {
    handlePrevPage,
    page,
    handleNextPage
  } = props

  return (
    <div className='d-flex align-items-center justify-content-center'>

      <button className='btn whiteBtn' style={{ marginRight: '7px' }} onClick={handlePrevPage}>{'<'}</button>

      {page}

      <button className='btn whiteBtn' style={{ marginLeft: '7px' }} onClick={handleNextPage}>{'>'}</button>

    </div>
  )
}
