import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { PairNames } from "./PairNames";
import "./Speedback.css";

export const extractCheckedMembers = (members) => {
  const checkedMembers = members
    .filter((member) => !!member.checked)
    .map((member) => {
      return member.name;
    });

  return checkedMembers;
};

export const getSpeedbackPairs = (members) => {
  const membersArr = [...members];

  if (membersArr.length % 2 === 1) {
    membersArr.push(undefined);
  }

  const timesToRotate = membersArr.length - 1;
  const timesToPair = Math.round(membersArr.length / 2);
  const output = [];

  for (let i = 0; i < timesToRotate; i++) {
    const set = [];
    for (let k = 0; k < timesToPair; k++) {
      const lastIndex = membersArr.length - 1;
      const pair = [membersArr[k], membersArr[lastIndex - k]];
      set.push(pair);
    }
    output.push(set);
    const memberToRotate = membersArr.splice(1, 1);
    membersArr.push(memberToRotate.shift());
  }

  return output;
};

export const Speedback = ({ members }) => {
  const [speedbackPairsSet, setSpeedbackPairsSet] = useState([]);
  const [page, setPage] = useState(-1);

  const onClickSpeedbackButton = () => {
    if (page < 0) {
      const extractedMembers = extractCheckedMembers(members);
      console.log("mem", extractedMembers);
      const pairsSet = getSpeedbackPairs(extractedMembers);
      setSpeedbackPairsSet(pairsSet);
      setPage(0);
    } else if (page < speedbackPairsSet.length - 1) {
      setPage(page + 1);
    } else {
      setPage(-1);
    }
  };

  return (
    <section>
      <div className={"pairs-container"}>
        {!!speedbackPairsSet.length &&
          page >= 0 &&
          page < speedbackPairsSet.length &&
          speedbackPairsSet[page].map((pair) => {
            return (
              <PairNames
                key={`${pair[0]}-${pair[1]}`}
                name1={pair[0]}
                name2={pair[1]}
              />
            );
          })}
      </div>

      <Button
        className={"section__button"}
        color="primary"
        onClick={onClickSpeedbackButton}
      >
        {page < 0 ? "start" : "next"}
      </Button>
    </section>
  );
};

Speedback.propTypes = {
  members: PropTypes.array.isRequired,
};
