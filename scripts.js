import { addExpense, deleteExpense } from "./utils.js";

let expenses = [];
const expenseData = localStorage.getItem("expenses");
if (expenseData != null)
  expenses = JSON.parse(expenseData);
const addExpenseButton = document.querySelector("#addexpense");

addExpenseButton.addEventListener("click", function () {
  const incomeValue = Number(document.querySelector("#income").value);
  const amount = Number(document.querySelector("#exp").value);
  const category = document.querySelector("#category").value;
  const date = document.querySelector("#date").value;

  addExpense(expenses, amount, category, date);
  calculateTotal(incomeValue);
  renderExpenses();
});

function Expense(amount, category, date) {
  this.amount = amount;
  this.category = category;
  this.date = date;
}

// function addExpense(amount, category, date) {
//   expenses.push(new Expense(amount, category, date));
//   const data = JSON.stringify(expenses);
//   localStorage.setItem("expenses",data);
// }

function renderExpenses() {
  const expenseListContainer = document.getElementById("expense-list");
  const incomeInput = document.getElementById("income");

  expenseListContainer.innerHTML = "";

  const expenseListTitle = document.createElement("div");
  expenseListTitle.innerHTML =
    "<h3>Expense List</h3><p>No. | Date | Expense | Category</p>";

  expenseListContainer.appendChild(expenseListTitle);

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];

    const expenseRow = document.createElement("div");
    expenseRow.textContent = `${i + 1} | ${expense.date} | ${expense.amount} | ${expense.category}`;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";

    deleteButton.addEventListener("click", function () {
      deleteExpense(expenses, i);
      renderExpenses();
      calculateTotal(Number(incomeInput.value));
    });

    expenseRow.appendChild(deleteButton);
    expenseListContainer.appendChild(expenseRow);
  }
}

function calculateTotal(incomeValue) {
  const totalExpense = expenses.reduce((acc, cur) => acc + cur.amount, 0);
  const netSavings = incomeValue - totalExpense;

  const totalDisplay = document.getElementById("total-expense-display");
  totalDisplay.innerHTML = "";

  const summaryDiv = document.createElement("div");
  summaryDiv.innerHTML = `<p>Total Expense: ${totalExpense}</p><p>Net Savings: ${netSavings}</p>`;

  totalDisplay.appendChild(summaryDiv);
}

// function deleteExpense(index) {
//   expenses.splice(index, 1);
//   const data = JSON.stringify(expenses);
//   localStorage.setItem("expenses",data);
// }

function filterByCategory(category) {
  for (let expense of expenses) {
    if (expense.category === category) {
      console.log(
        `${expense.amount} | ${expense.category} | ${expense.date}`
      );
    }
  }
}

renderExpenses()

// Feature          |getElementById               |	querySelector
// Accepts          |ID string only (e.g., 'myId')|  CSS Selectors (e.g., '#myId', '.myClass')
// Returns          |Single element	              |  First matching element
// Speed	          |Extremely Fast	              |  Slightly Slower
// Can be called on	|document only	              |  document or any Element
calculateTotal(Number(document.querySelector("#income").value)||0);