import React, { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Members } from "./Components/Members";
import { NameSelector } from "./Components/NameSelector";

const getMembersInitialVal = () => {
  return JSON.parse(localStorage.getItem("members")) || [];
}

function App() {
  const [members, setMembers] = useState(getMembersInitialVal());

  const saveMembers = (members) => {
    setMembers(members);
    localStorage.setItem("members",  JSON.stringify(members));
  }

  return (
    <div className="App">
      <Header />
      <div className={"name-selector"}>
        <NameSelector members={members} />
        <Members members={members} setMembers={saveMembers} />
      </div>

    </div>
  );
}

export default App;
