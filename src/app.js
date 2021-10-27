import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'react-dates/lib/css/_datepicker.css';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { setTextFilter } from './actions/filters';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();


store.dispatch(addExpense({ description: 'Water bill', amount: 4500, createdAt: 7500}));
store.dispatch(addExpense({ description: 'Gas bill', amount: 3000, createdAt: 1600}));
store.dispatch(addExpense({ description: 'Rent', amount: 109500, createdAt: 1600}));

const state = store.getState();

const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);

const jsx = (
    <Provider store = {store}>
     <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
