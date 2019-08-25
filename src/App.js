import React, { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Members } from "./Components/Members";
import { NameSelector } from "./Components/NameSelector";

function App() {
  const [members, setMembers] = useState([
  ]);
  return (
    <div className="App">
      <Header />
      <div className={"name-selector"}>
        <NameSelector members={members} />
        <Members members={members} setMembers={setMembers} />
      </div>

    </div>
  );
}

export default App;
