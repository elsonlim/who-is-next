import React, { useState } from "react";
import { MemberItem } from "../Commons/MemberItem";
import { Button } from "reactstrap";
import "./Member.css";

export const Members = ({ members, setMembers }) => {
  const [newMemberName, setNewMemberName] = useState("");

  const renderMembers = () => {
    const membersSelection = members.map(member => (
      <MemberItem
        key={member.name}
        member={member}
        members={members}
        setMembers={setMembers}
      />
    ));

    const addMember = () => {
      if (
        newMemberName.length < 2 ||
        members.findIndex(
          a => a.name.toLowerCase() === newMemberName.toLowerCase()
        ) >= 0
      ) {
        alert("invalid/duplicate name");
        return;
      }
      const newMembers = [...members, { name: newMemberName, checked: true }];
      setMembers(newMembers);
      setNewMemberName("");
    };

    return (
      <div id="members">
        <input
          data-testid="add-member"
          aria-label="members-name"
          onChange={event => {
            setNewMemberName(event.target.value);
          }}
          value={newMemberName}
        />
        <Button data-testid={"add-btn"} color="primary" onClick={addMember}>
          Add
        </Button>
        <h2>Members</h2>
        {membersSelection}
      </div>
    );
  };

  return <div>{renderMembers()}</div>;
};
