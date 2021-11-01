export default (expenses) => {
    const reducer = (prevVal, currVal) => prevVal + currVal;
    return expenses.map(expense => expense.amount).reduce(reducer, 0);
}