import React, { useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

import uuid from "uuid/v4";

const initialExpenses = [
  {
    id: uuid(),
    charge: "Rent",
    amount: 1600
  },
  {
    id: uuid(),
    charge: "Transport",
    amount: 600
  },
  {
    id: uuid(),
    charge: "Food",
    amount: 2000
  }
];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  const handleCharge = e => {
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "field can't be empty" });
    }
  };

  //Clear all items
  const clearItem = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All item deleted" });
  };

  //Delete Single item
  const handleDelete = id => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "Item deleted" });
  };

  //Edit item
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setAmount(amount);
    setCharge(charge);
    setEdit(true);
    setId(id);
  };

  return (
    <React.Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          handleSubmit={handleSubmit}
          charge={charge}
          handleCharge={handleCharge}
          amount={amount}
          handleAmount={handleAmount}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItem={clearItem}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        ></ExpenseList>
      </main>
      <h1>
        Total spending :{" "}
        <span className="total">
          ${" "}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </React.Fragment>
  );
}

export default App;
