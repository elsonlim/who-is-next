import React, { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Members } from "./Components/Members";
import { NameSelector } from "./Components/NameSelector";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Pairs } from "./Components/Pairs";

const getMembersInitialVal = () => {
  return JSON.parse(localStorage.getItem("members")) || [];
};

function App() {
  const [members, setMembers] = useState(getMembersInitialVal());

  const saveMembers = members => {
    setMembers(members);
    localStorage.setItem("members", JSON.stringify(members));
  };

  return (
    <div className="App">
      <Header />
      <div className={"name-selector"}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <NameSelector members={members} />}
          />
          <Route path="/pairs" component={() => <Pairs members={members} />} />
          <Redirect to="/" />
        </Switch>
        <Members members={members} setMembers={saveMembers} />
      </div>
    </div>
  );
}

export default () => (
  <div>
    <Router>
      <App />
    </Router>
  </div>
);
