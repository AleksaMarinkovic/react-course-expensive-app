import { shallow } from 'enzyme';
import React from 'react';
import { startLogout } from '../../actions/auth';
import { Header } from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});


test('should call startLogout on button click', () => {
    const startLogoutSpy = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogoutSpy}/>);
    wrapper.find('button').at(0).simulate('click');
    expect(startLogoutSpy).toHaveBeenCalled();
});