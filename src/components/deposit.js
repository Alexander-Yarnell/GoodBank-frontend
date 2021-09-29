import React, { useContext } from "react";
import UserContext from "./context";
import transition from "./Transaction.jpg";
import Card from "./card";

function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <div>
      <div className="filter">
        <Card
          bgcolor="success"
          header="Deposit"
          status={status}
          body={
            show ? (
              <DepositForm setShow={setShow} setStatus={setStatus} />
            ) : (
              <DepositMsg setShow={setShow} setStatus={setStatus} />
            )
          }
        />
      </div>
      <img src={transition} className="bg" />
    </div>
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Deposit again
      </button>
      <br />
    </>
  );
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState("");
  const { handleTransaction, name, email, balance } = useContext(UserContext);

  function handle() {
    if (amount <= 0) {
      props.setStatus("Invalid Ammount");
    }
    if (amount > 0) {
      fetch(`http://167.99.146.179:8080/account/update/${email}/${amount}`)
        .then((response) => response.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            handleTransaction(amount);
            props.setStatus(data.balance);
            props.setShow(false);
            console.log("JSON:", data);
          } catch (err) {
            props.setStatus("Deposit failed");
            console.log("err:", text);
          }
        });
    }
  }

  return (
    <>
      <h1>{name}</h1>
      <h2>{balance}</h2>
      Amount
      <br />
      <input
        type="text"
        pattern="[0-9]*"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Deposit
      </button>
    </>
  );
}

export default Deposit;
