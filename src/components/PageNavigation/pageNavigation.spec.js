import React from 'react'
import { PageNavigation } from './PageNavigation'

const setUp = () => shallow(<PageNavigation />);

describe('PageNavigation component', () => {
    it('should render PageNavigation component', () => {
        const component = setUp()
        expect(component.debug()).toMatchSnapshot()
    })
})