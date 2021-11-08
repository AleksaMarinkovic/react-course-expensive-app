import { shallow } from "enzyme";
import { LoginPage } from '../../components/LoginPage';
import React from 'react';

test('should match snapshot of the component', () => {
    const wrapper = shallow(<LoginPage></LoginPage>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLogin on button click', () => {
    const startLoginSpy = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLoginSpy}/>);
    wrapper.find('GoogleButton').at(0).simulate('click');
    expect(startLoginSpy).toHaveBeenCalled();
});