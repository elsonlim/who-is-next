import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

export const getRandomiseNameList = names => {
  return names
    .map(name => ({
      name,
      weight: Math.random(),
    }))
    .sort((a, b) => a.weight - b.weight)
    .map(nameObj => nameObj.name);
};

export const NameHistory = ({ names }) => {
  return (
    <div>
      <p>History</p>
      {[0, 1, 2].map(i => {
        return (
          !!names[i] && (
            <p key={`${i}`}>
              {i + 1}. {names[i]}
            </p>
          )
        );
      })}
    </div>
  );
};

export const NameSelector = ({ members }) => {
  const noMemberDisplay = "Add or Checked Names";
  const startingDisplay = "WHO IS NEXT?";

  const [curMembers, setCurMembers] = useState([]);
  const [randomMembersList, setRandomMembersList] = useState([]);
  const [nameHistory, setNameHistory] = useState([]);
  const [display, setDisplay] = useState(startingDisplay);

  useEffect(() => {
    if (curMembers !== members) {
      setCurMembers(members);
      const checkedNames = members.reduce((acc, cur) => {
        if (cur && cur.checked) {
          acc.push(cur.name);
        }
        return acc;
      }, []);

      let newRandomList = randomMembersList.filter(member =>
        checkedNames.includes(member)
      );

      let shouldShuffle = false;
      const combineList = [...randomMembersList, ...nameHistory];
      checkedNames.forEach(name => {
          if(!combineList.includes(name)){
            newRandomList.push(name);
            shouldShuffle = true;
          }
      });

      if(shouldShuffle) {
        newRandomList = getRandomiseNameList(newRandomList);

      }
      setRandomMembersList(newRandomList);
    }
  }, [members, nameHistory, randomMembersList, curMembers]);

  const resetHistory = (arr = []) => setNameHistory([...arr]);

  const getName = () => {
    const memberNameList = members.filter(member => member.checked).map(member => member.name)

    if (!memberNameList.length) {
      setDisplay(noMemberDisplay);
    } else if (randomMembersList.length) {
      const curMember = randomMembersList.shift();
      setDisplay(curMember);
      setNameHistory([curMember, ...nameHistory]);
    } else {
      const newNameList = getRandomiseNameList(memberNameList);
      setRandomMembersList([...newNameList]);
      setDisplay(startingDisplay);
      resetHistory();
    }
  };

  return (
    <div>
      <div>{display}</div>
      <Button data-testid={"getName-btn"} color="primary" onClick={getName}>
        getName
      </Button>
      <NameHistory names={nameHistory} />
    </div>
  );
};
