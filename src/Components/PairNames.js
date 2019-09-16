import React from "react";
import "./PairNames.css";

export const PairNames = ({ name1, name2 }) => {
  return (
    <div className={"pair-names"}>
      {name1 && <p>1. {name1}</p>}
      {name2 && <p>2. {name2}</p>}
    </div>
  );
};
