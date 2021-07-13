import React from 'react'
import { PerPage } from './PerPage'

const props = {
    limitArray: [1, 2, 3]
};
const setUp = (props) => shallow(<PerPage {...props} />);

describe('PerPage component', () => {
    it('should render PerPage component', () => {
        const component = setUp(props)
        expect(component.debug()).toMatchSnapshot()
    })
})