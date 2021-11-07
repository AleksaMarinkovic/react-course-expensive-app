import { addExpense, removeExpense, editExpense, startAddExpense, setExpenses, startSetExpenses, startRemoveExpense, startEditExpense } from "../../actions/expenses";
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import { get, ref, set, goOffline} from "firebase/database";

const uid = 'testid';
const createMockStore = configureMockStore([thunk]);
const defaultAuthState = { auth: {uid} };

afterAll(async() => {
    await goOffline(database);
});

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
      expensesData[id] = {
          description,
          note,
          amount,
          createdAt
      }
    });
    set(ref(database, `users/${uid}/expenses`), expensesData).then(() => {
      done();
    });
});
//#region REMOVE EXPENSE AND START REMOVE EXPENSE
test(`should setup remove expense action object`, () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase and redux store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
         const actions = store.getActions();
         expect(actions[0]).toEqual({
             type: 'REMOVE_EXPENSE',
             id
         });     
         return get(ref(database, `users/${uid}/expenses/${id}`)); 
    }).then((snapshot) => {
         expect(snapshot.val()).toBeNull();
         done();
    });
 });
//#endregion
//#region EDIT EXPENSE AND START EDIT EXPENSE
test(`should setup edit expense action object`, () => {
    const action = editExpense('123abc', { note: `New note`});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
             note: `New note`
        }
    })
});

test('should edit expense on firebase and redux store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        description: 'updated description',
        note: 'updated note',
        amount: 10,
        createdAt: 123456
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
         const actions = store.getActions();
         expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
         });     
         return get(ref(database, `users/${uid}/expenses/${id}`)); 
    }).then((snapshot) => {
         expect(snapshot.val()).toEqual(updates);
         done();
    });
});

//#endregion
//#region ADD EXPENSE AND START ADD EXPENSE (with default and provided values)
test(`should setup add expense action object with provided values`, () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: `ADD_EXPENSE`,
        expense: expenses[2]
    })
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 34839
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return get(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`));
    }).then((snapshot) => {
        const data = snapshot.val();
        expect(data).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseDefaultData = {
        description: '',
        note: '',
        amount:  0,
        createdAt:  0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaultData
            }
        });
        return get(ref(database, `users/${uid}/expenses/${actions[0].expense.id}`));
    }).then((snapshot) => {
        const data = snapshot.val();
        expect(data).toEqual(expenseDefaultData);
        done();
    });;
});
//#endregion
//#region SET EXPENSE AND START SET EXPENSE (fetching data from database)
test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
//#endregion