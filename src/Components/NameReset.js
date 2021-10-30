import React from "react";
import { Button } from "reactstrap";
import { Local_Random_Member_List, Local_History_Key } from "../Commons/StorageKeys";
import "./NameReset.css";

export const NameReset = ({
  setRandomMembersList,
  setNameHistory,
  setDisplay
}) => {
  const resetNames = () => {
    localStorage.removeItem(Local_Random_Member_List);
    localStorage.removeItem(Local_History_Key);
    setRandomMembersList([]);
    setNameHistory([]);
    setDisplay();
  };

  return (
    <div>
      <Button
        className={"name-reset__button"}
        data-testid={"resetName-btn"}
        color="primary"
        onClick={resetNames}>
        Reset
      </Button>
    </div>
  );
};
