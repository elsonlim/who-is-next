import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { PairNames } from "./PairNames";
import "./Pairs.css";

const getPairs = (members) => {
  const pairs = [];
  for (let i = 0; i < members.length; i += 2) {
    pairs.push(
      <PairNames
        key={i}
        name1={members[i].name}
        name2={members[i + 1] && members[i + 1].name}
      />
    );
  }
  return pairs;
};

export const Pairs = ({ members }) => {
  const [randomePairs, setRandomPairs] = useState([]);

  const assignMembersToPairs = () => {
    const randomMembers = members
      .filter((member) => !!member.checked)
      .map((name) => ({
        name,
        weight: Math.random(),
      }))
      .sort((a, b) => a.weight - b.weight)
      .map((nameObj) => nameObj.name);

    setRandomPairs(randomMembers);
  };

  return (
    <section>
      {!randomePairs.length ? (
        <div className={"pairs__title"}>Pair who</div>
      ) : (
        <div className={"pairs__pairedNames"}>{getPairs(randomePairs)}</div>
      )}

      <Button
        className={"pairs__button"}
        color="primary"
        onClick={assignMembersToPairs}
      >
        Get Pairs
      </Button>
    </section>
  );
};

Pairs.propTypes = {
  members: PropTypes.array.isRequired,
};
