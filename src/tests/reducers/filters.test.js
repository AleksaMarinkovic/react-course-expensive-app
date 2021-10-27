import moment from 'moment';
import { sortByAmount } from '../../actions/filters';
import filtersReducer from '../../reducers/filters';

test(`should setup default filter values`, () => {
    const state = filtersReducer(undefined, {type: `@@INIT`});
    expect(state).toEqual({
        text: ``,
        sortBy: `date`,
        startDate: moment().startOf(`month`),
        endDate: moment().endOf(`month`)
    });
});

test(`should set sortBy to amount`, () => {
    const state = filtersReducer(undefined, { 
        type: 'SORT_BY_AMOUNT'
    });
    expect(state.sortBy).toBe('amount');
});

test(`should set sortBy to date`, () => {
    const prevState = {
        text: '',
        sortBy: 'amount',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    }
    const state = filtersReducer(prevState, { 
        type: 'SORT_BY_DATE'
    });
    expect(state.sortBy).toBe('date');
});

test(`should set text filter`, () => {
    const text = `SomeText`
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text
    })
    expect(state.text).toBe(text);
});

test(`should set startDate filter`, ()=> {
    const startDate = moment(1000);
    const state = filtersReducer(undefined, {
        type: 'SET_START_DATE',
        startDate
    })
    expect(state.startDate).toEqual(startDate);
});

test(`should set endDate filter`, ()=> {
    const endDate = moment(1500);
    const state = filtersReducer(undefined, {
        type: 'SET_END_DATE',
        endDate
    })
    expect(state.endDate).toEqual(endDate);
});