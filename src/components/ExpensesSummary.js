import React from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';
import numeral from "numeral";

export const ExpensesSummary = ({ expensesLength, total }) => {
    const expenseWord = expensesLength === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(total / 100).format('0.00 $ ');
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Currently showing <span> {expensesLength} </span> {expenseWord} totalling <span> {formattedTotal} </span>
                </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add expense</Link>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = selectExpenses(state.expenses, state.filters);
    return {
        expensesLength: visibleExpenses.length,
        total: expensesTotal(visibleExpenses)
    }
}

export default connect(mapStateToProps)(ExpensesSummary);