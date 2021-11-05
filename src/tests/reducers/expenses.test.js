import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test(`should have default values`, () => {
    const state = expensesReducer(undefined, {type: `@@INIT`});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id not found', () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: 'newId'
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

// adding

test('should add expense', () => {
    const expense = {
        id: '4',
        description: 'Coffee',
        note: 'newNote',
        amount: 26000,
        createdAt: 10000
    }
    const action = {
        type: "ADD_EXPENSE",
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});
// editing existing / not existing

test(`should edit expense`, () => {
    const description = 'newDescription';
    const updates = {
        description
    }
    const action = {
        type: `EDIT_EXPENSE`,
        id: '2',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toBe(description);

});

test(`should not edit if id not found`, ()=>{
    const description = 'newDescription';
    const updates = {
        description
    }
    const action = {
        type: `EDIT_EXPENSE`,
        id: '5',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const newExpenses = [
        {
            id: '4',
            description: 'Covfefe',
            note: 'New expense 1',
            amount: 123,
            createdAt: 1234
        },
        {
            id: '5',
            description: 'Lemonade',
            note: 'New expense 2',
            amount: 4567,
            createdAt: moment(0).add(3, 'days').valueOf()
        }
    ]
    const action = {
        type: 'SET_EXPENSES',
        expenses: newExpenses
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(newExpenses);
});