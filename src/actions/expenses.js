import { v4 as uuidv4 } from 'uuid';
import database from '../firebase/firebase';
import { ref, push, get, remove, update} from "firebase/database";


/* #region  ADD_EXPENSE AND START_ADD_EXPENSE */
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

// pushes data to firebase db and only after its pushed it dispatches to redux store
export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = { description, note, amount, createdAt };
        return push(ref(database, `users/${uid}/expenses`), expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};
/* #endregion */
/* #region  SET_EXPENSES AND START_SET_EXPENSES */
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

// fetches data from firebase db and only after it fetches it dispatches to redux store so it can be rendered
export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return get(ref(database, `users/${uid}/expenses`)).then((snapshot) => {            
            const expenses = [];
            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    }
};
/* #endregion */
/* #region  REMOVE_EXPENSE AND START_REMOVE_EXPENSE */

export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

// removes expense on the firestore database, then dispatches the redux store remove expense action
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return remove(ref(database, `users/${uid}/expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};
/* #endregion */
/* #region  EDIT_EXPENSE AND START_EDIT_EXPENSE */
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// edits expense on the firestore database, then dispatches the redux store edit expense action
export const startEditExpense = (id, updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return update(ref(database, `users/${uid}/expenses/${id}`), updates).then(() => {
          dispatch(editExpense(id, updates));
        });
    };
};
/* #endregion */