import { useState } from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const addExpense = (e) => {
    e.preventDefault();

    if (!name || !amount) {
      alert("Please enter expense name and amount");
      return;
    }

    const newExpense = {
      id: Date.now(),
      name: name,
      amount: Number(amount),
      category: category,
    };

    setExpenses([...expenses, newExpense]);

    setName("");
    setAmount("");
    setCategory("Food");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const total = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="container">
      <h1>Expense Tracker</h1>

      {/* Summary */}
      <div className="summary">
        <div className="card">
          <h3>Total Spent</h3>
          <p>₹{total.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Expenses</h3>
          <p>{expenses.length}</p>
        </div>
      </div>

      {/* Add Expense */}
      <form onSubmit={addExpense} className="expense-form">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>

      {/* Expense List */}
      <div className="expense-list">
        <h2>Expenses</h2>

        {expenses.length === 0 ? (
          <p className="empty">No expenses added yet.</p>
        ) : (
          expenses.map((expense) => (
            <div className="expense-item" key={expense.id}>
              <div>
                <h3>{expense.name}</h3>
                <span>{expense.category}</span>
              </div>

              <div className="expense-right">
                <strong>₹{expense.amount.toFixed(2)}</strong>

                <button
                  className="delete-btn"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;