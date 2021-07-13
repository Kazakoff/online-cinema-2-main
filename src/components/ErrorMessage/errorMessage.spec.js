import React from 'react'
import { ErrorMessage } from './ErrorMessage'

const props = {
    error: 'some error'
};

const setUp = (props) => shallow(<ErrorMessage {...props} />);

describe('ErrorMessage component', () => {
    it('should render ErrorMessage component', () => {
        const component = setUp(props)
        expect(component.debug()).toMatchSnapshot()
    })
})