function addExpense(expenses,amount, category, date) {
  expenses.push({amount, category, date});
  const data = JSON.stringify(expenses);
  localStorage.setItem("expenses",data);
}

function deleteExpense(expenses, index) {
  expenses.splice(index, 1);
  const data = JSON.stringify(expenses);
  localStorage.setItem("expenses",data);
}

export {addExpense , deleteExpense};