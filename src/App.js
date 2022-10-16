import React, { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Members } from "./Components/Members";
import { NameSelector } from "./Components/NameSelector";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Pairs } from "./Components/Pairs";
import { Speedback } from "./Components/Speedback";

const getMembersInitialVal = () => {
  return JSON.parse(localStorage.getItem("members")) || [];
};

function App() {
  const [members, setMembers] = useState(getMembersInitialVal());

  const saveMembers = (members) => {
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
          <Route
            exact
            path="/pairs"
            component={() => <Pairs members={members} />}
          />
          <Route
            exact
            path="/speedback"
            component={() => <Speedback members={members} />}
          />
          <Redirect to="/" />
        </Switch>
        <Members members={members} setMembers={saveMembers} />
      </div>
    </div>
  );
}

const AppWithRouter = () => (
  <div>
    <Router>
      <App />
    </Router>
  </div>
);

export default AppWithRouter;
