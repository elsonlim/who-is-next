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
  const [pageIndex, setPageIndex] = useState(-1);

  const onClickSpeedbackButton = () => {
    if (pageIndex < 0) {
      const extractedMembers = extractCheckedMembers(members);
      const pairsSet = getSpeedbackPairs(extractedMembers);
      setSpeedbackPairsSet(pairsSet);
      setPageIndex(0);
    } else if (pageIndex < speedbackPairsSet.length - 1) {
      setPageIndex(pageIndex + 1);
    } else {
      setSpeedbackPairsSet([]);
      setPageIndex(-1);
    }
  };

  return (
    <section>
      <div className={"pairs-container"}>
        {!!speedbackPairsSet.length &&
          pageIndex >= 0 &&
          pageIndex < speedbackPairsSet.length &&
          speedbackPairsSet[pageIndex].map((pair) => {
            return (
              <PairNames
                key={`${pair[0]}-${pair[1]}`}
                name1={pair[0]}
                name2={pair[1]}
              />
            );
          })}
      </div>

      {pageIndex > 0 && (
        <Button
          className={"section__button"}
          color="secondary"
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          previous
        </Button>
      )}
      <Button
        className={"section__button"}
        color="primary"
        onClick={onClickSpeedbackButton}
      >
        {pageIndex < 0 ? "start" : "next"}
      </Button>
      <div>
        {speedbackPairsSet.length
          ? `${pageIndex + 1}/${speedbackPairsSet.length}`
          : ""}
      </div>
    </section>
  );
};

Speedback.propTypes = {
  members: PropTypes.array.isRequired,
};
