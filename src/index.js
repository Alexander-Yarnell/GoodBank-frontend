import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import UserContext from "./components/context";
import CreateAccount from "./components/createAccount";
import Login from "./components/login";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";

function Spa() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState(0);

  function handleTransaction(num) {
    setBalance(balance + parseInt(num));
  }

  function handleLogin(newName, newEmail, newBalance) {
    setName(newName);
    setEmail(newEmail);
    setBalance(newBalance);
  }

  function handleLogout() {
    setName("");
    setEmail("");
    setBalance("");
  }

  return (
    <HashRouter>
      <UserContext.Provider
        value={{
          name: name,
          email: email,
          balance: balance,
          handleTransaction: handleTransaction,
          handleLogin,
          handleLogout,
        }}
      >
        <NavBar />
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/createaccount/" component={CreateAccount} />
          <Route path="/login/" component={Login} />
          <Route path="/deposit/" component={Deposit} />
          <Route path="/withdraw/" component={Withdraw} />
        </div>
      </UserContext.Provider>
    </HashRouter>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Spa />
  </React.StrictMode>,
  document.getElementById("root")
);
