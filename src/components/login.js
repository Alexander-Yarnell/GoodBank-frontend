import React from "react";
import Card from "./card";
import UserContext from "./context";
import bank from "./Bank.jpg";
import "./css/home.css";

function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [height, setHeight] = React.useState("20rem");
  const ctx = React.useContext(UserContext);

  return (
    <>
      <div className="filter">
        <Card
          height="auto"
          bgcolor="white"
          txtcolor="black"
          header="GoodBank"
          status={status}
          body={
            ctx.name <= 0 ? (
              <LoginForm setShow={setShow} setStatus={setStatus} />
            ) : (
              <LoginMsg setShow={setShow} setStatus={setStatus} />
            )
          }
        />
      </div>
      <img src={bank} className="bg" />
    </>
  );
}

function LoginMsg(props) {
  const { handleLogout } = React.useContext(UserContext);
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-warning"
        onClick={() => {
          props.setShow(true);
          handleLogout();
        }}
      >
        Logout
      </button>
    </>
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { handleLogin } = React.useContext(UserContext);
  const url = `http://167.99.146.179:8080/account/login/${email}/${password}`;
  function handle() {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          handleLogin(data.name, data.email, data.balance);
          props.setStatus("");
          props.setShow(false);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", err);
        }
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <div className="card-buttons">
      <button type="submit" className="btn btn-warning" onClick={handle}>
        Login
      </button>
        <a className="btn btn-light" href="#/CreateAccount">Sign Up</a>
      </div>
      <br/>
    </>
  );
}

export default Login;
