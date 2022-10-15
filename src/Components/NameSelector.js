import React, { useState, useEffect } from "react";
import Button from "../Commons/Button";

import "./NameSelector.css";
export const getRandomiseNameList = (names) => {
  return names
    .map((name) => ({
      name,
      weight: Math.random(),
    }))
    .sort((a, b) => a.weight - b.weight)
    .map((nameObj) => nameObj.name);
};

export const NameHistory = ({ names }) => {
  return (
    <div className={"name-history"}>
      <h3 className={"name-history__title"}>History</h3>
      {names.map((name) => {
        return <p key={name}>{name}</p>;
      })}
    </div>
  );
};

const Local_Random_Member_list = "randomMemberList";
const Local_History_Key = "nameHistory";

const initFromStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const NameSelector = ({ members }) => {
  const noMemberDisplay = "Add or Checked Names";
  const startingDisplay = "WHO IS NEXT?";

  const [curMembers, setCurMembers] = useState([]);
  const [randomMembersList, setRandomMembersList] = useState(
    initFromStorage(Local_Random_Member_list)
  );
  const [nameHistory, setNameHistory] = useState(
    initFromStorage(Local_History_Key)
  );
  const [display, setDisplay] = useState(startingDisplay);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const saveRandomMembersList = (members) => {
    localStorage.setItem(Local_Random_Member_list, JSON.stringify(members));
    setRandomMembersList(members);
  };

  const saveNameHistory = (members) => {
    localStorage.setItem(Local_History_Key, JSON.stringify(members));
    setNameHistory(members);
  };

  useEffect(() => {
    if (curMembers !== members) {
      setCurMembers(members);
      const checkedNames = members.reduce((acc, cur) => {
        if (cur && cur.checked) {
          acc.push(cur.name);
        }
        return acc;
      }, []);

      let newRandomList = randomMembersList.filter((member) =>
        checkedNames.includes(member)
      );

      let shouldShuffle = false;
      const combineList = [...randomMembersList, ...nameHistory];
      checkedNames.forEach((name) => {
        if (!combineList.includes(name)) {
          newRandomList.push(name);
          shouldShuffle = true;
        }
      });

      if (shouldShuffle) {
        newRandomList = getRandomiseNameList(newRandomList);
      }
      saveRandomMembersList(newRandomList);
    }
  }, [
    curMembers,
    members,
    nameHistory,
    randomMembersList,
    saveRandomMembersList,
  ]);

  const resetHistory = (arr = []) => saveNameHistory([...arr]);

  const getName = () => {
    const memberNameList = members
      .filter((member) => member.checked)
      .map((member) => member.name);

    if (!memberNameList.length) {
      setDisplay(noMemberDisplay);
    } else if (randomMembersList.length) {
      const curMember = randomMembersList.shift();
      setDisplay(curMember);
      saveRandomMembersList([...randomMembersList]);
      saveNameHistory([curMember, ...nameHistory]);
    } else {
      const newNameList = getRandomiseNameList(memberNameList);
      saveRandomMembersList([...newNameList]);
      setDisplay(startingDisplay);
      resetHistory();
    }
  };

  return (
    <div data-testid="name-selector">
      <div className={"name-selector__display"}>{display}</div>
      <div>
        <Button
          className={"name-selector__button"}
          data-testid={"getName-btn"}
          color="primary"
          onClick={getName}
        >
          getName
        </Button>
        <NameHistory names={nameHistory} />
      </div>
    </div>
  );
};
