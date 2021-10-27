import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from 'moment';
let setTextFilterSpy, sortByDateSpy, sortByAmountSpy, setStartDateSpy, setEndDateSpy, wrapper;

beforeEach(() => {
    setTextFilterSpy = jest.fn();
    sortByDateSpy = jest.fn();
    sortByAmountSpy = jest.fn();
    setStartDateSpy = jest.fn();
    setEndDateSpy = jest.fn();
    wrapper = shallow(
    <ExpenseListFilters
        filters={filters}
        setTextFilter = {setTextFilterSpy}
        sortByDate = {sortByDateSpy}
        sortByAmount = {sortByAmountSpy}
        setStartDate = {setStartDateSpy}
        setEndDate = {setEndDateSpy}
    />
    );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

// should handle text change
test('should handle text changes', () => {
    const value = 'New Text';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(setTextFilterSpy).toHaveBeenLastCalledWith(value);
})
// should sort by date
test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDateSpy).toHaveBeenCalledWith();
});

// should sort by amount
test('should sort by amount', () => {
    const value = 'amount';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmountSpy).toHaveBeenCalledWith();
});

// should handle date changes
test('should handle date changes', () => {
    const startDate = moment().add(4,'year');
    const endDate = moment().add(8,'year');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDateSpy).toHaveBeenLastCalledWith(startDate);
    expect(setEndDateSpy).toHaveBeenLastCalledWith(endDate);
});

// should handle date picker focus changes
test('should handle date picker focus changes',() => {
    const calendarFocused = 'startDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});