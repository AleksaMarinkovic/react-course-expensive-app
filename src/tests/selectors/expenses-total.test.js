import expenses from '../fixtures/expenses';
import expensesTotal from '../../selectors/expenses-total';

test('should return 0 if no expenses', () => {
  const result = expensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up for single expense', () => {
  const result = expensesTotal([expenses[0]]);
  expect(result).toBe(195);
});

test('should correctly add up for multiple expenses', () => {
    const result = expensesTotal(expenses);
    expect(result).toBe(114195);
  });