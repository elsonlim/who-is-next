import React from "react";
import "./PairNames.css";

export const PairNames = ({ name1, name2 }) => {
  return (
    <div className={"pair-names"}>
      {name1 && <span className={name2 && "left"}>{name1}</span>}
      {name1 && name2 && <span className={"connector"}>&</span>}
      {name2 && <span className={name1 && "right"}>{name2}</span>}
    </div>
  );
};
