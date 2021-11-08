import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startRemoveExpense, startEditExpense} from '../actions/expenses';
import { Link } from 'react-router-dom';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }
  onClick = () => {
    this.props.startRemoveExpense({ id: this.props.expense.id });
    this.props.history.push('/');
  }
  render(){
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <div className="page-header__container">
              <h1 className="page-header__title">Editing expense</h1>
              <Link className="page-header__link" to="/dashboard">&lt;&lt; Back to my expenses</Link>
            </div>            
          </div>         
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button-secondary" onClick={this.onClick}>Remove</button>
        </div>        
      </div>
    );
  }
}
const mapStateToProps = (state, props) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)  
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
}); 

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
