import React from 'react'
import { StyleForPagination } from './StyleForPagination'

const setUp = () => shallow(<StyleForPagination />);

describe('StyleForPagination component', () => {
    it('should render StyleForPagination component', () => {
        const component = setUp()
        expect(component.debug()).toMatchSnapshot()
    })
})