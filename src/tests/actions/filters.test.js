import { setTextFilter, setEndDate, setStartDate, sortByDate, sortByAmount } from "../../actions/filters";
import moment from 'moment';

test(`should set text filters with params`, () => {
    const action = setTextFilter(`TextFilter`);
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: `TextFilter`
    })
});

test(`should set text filters without params`, () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ``
    })
});

test(`should set start date`, () => {
    const action = setStartDate(moment(0))
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    })
});

test(`should set end date`, () => {
    const action = setEndDate(moment(10))
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(10)
    })
});

test(`should set sort by date`, () => {
    expect(sortByDate()).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test(`should set sort by amount`, () => {
    expect(sortByAmount()).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});