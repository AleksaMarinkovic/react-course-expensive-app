import React from "react";
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';
import numeral from "numeral";

export const ExpensesSummary = ({expensesLength, total}) => 
{   
    const expenseWord = expensesLength === 1 ? 'expense' : 'expenses';
    const formattedTotal = numeral(total / 100).format('$ 0,0.00');
    return (
        <div>
            {
                expensesLength > 0 && (<p>Currently showing {expensesLength} {expenseWord} totalling {formattedTotal}</p>)
            }
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
