import React from 'react'
import { DropDown } from './DropDown'

const props = {
    label: 'some label',
    style: { marginLeft: '7px' },
    children: 
    <>
        <p>1</p>
        <p>2</p>
    </>
};

const setUp = (props) => shallow(<DropDown {...props} />);

describe('DropDown component', () => {
    it('should render DropDown component', () => {
        const component = setUp(props)
        expect(component.debug()).toMatchSnapshot()
    })
})