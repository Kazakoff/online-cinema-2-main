import React from 'react';

export const StyleForPagination = (props) => {

  return (
    <div className='d-flex justify-content-center' style={{ marginBottom: '12px' }}>
      {props.children}
    </div>
  )
}
