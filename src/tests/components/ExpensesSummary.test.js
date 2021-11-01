import shallow from "enzyme/build/shallow";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import React from 'react';

test('should matchsnapshot when 1 expense is showing', () => {
    const wrapper = shallow(<ExpensesSummary expensesLength={1} total={9500}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should matchsnapshot when 2 expenses are showing', () => {
    const wrapper = shallow(<ExpensesSummary expensesLength={2} total={75333}/>);
    expect(wrapper).toMatchSnapshot();
});