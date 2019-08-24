import React, { useState } from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { Members } from "./Components/Members";
import { NameSelector } from "./Components/NameSelector";

function App() {
  const [memebrs, setMembers] = useState([
  ]);
  return (
    <div className="App">
      <Header />
      <NameSelector members={memebrs} />
      <Members members={memebrs} setMembers={setMembers} />
    </div>
  );
}

export default App;
