const Income = require('../models/Income');
const Expense = require('../models/Expense');

exports.summary = async (req, res) => {
  const incomes = await Income.find({ userId: req.user.id });
  const expenses = await Expense.find({ userId: req.user.id });

  const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = Math.max(balance * 0.2, 0);

  res.json({
    success: true,
    data: {
      totalIncome,
      totalExpense,
      balance,
      savings,
      incomes: incomes.slice(0, 5),
      expenses: expenses.slice(0, 5),
    },
  });
};

exports.analytics = async (req, res) => {
  const incomes = await Income.find({ userId: req.user.id });
  const expenses = await Expense.find({ userId: req.user.id });

  const categoryMap = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const monthlyIncome = {};
  const monthlyExpense = {};

  const monthKey = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  incomes.forEach((item) => {
    const key = monthKey(item.date);
    monthlyIncome[key] = (monthlyIncome[key] || 0) + item.amount;
  });

  expenses.forEach((item) => {
    const key = monthKey(item.date);
    monthlyExpense[key] = (monthlyExpense[key] || 0) + item.amount;
  });

  const months = Array.from(new Set([...Object.keys(monthlyIncome), ...Object.keys(monthlyExpense)])).sort((a, b) => new Date(a) - new Date(b));

  const monthlyTrend = months.map((month) => ({
    month,
    income: monthlyIncome[month] || 0,
    expense: monthlyExpense[month] || 0,
  }));

  res.json({
    success: true,
    data: {
      categoryBreakdown: Object.entries(categoryMap).map(([category, amount]) => ({ category, amount })),
      monthlyTrend,
    },
  });
};
