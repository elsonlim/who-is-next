import React from "react";

export const MemberItem = ({ member, members, setMembers }) => {
  const toggleCheckbox = member => {
    member.checked = !member.checked;
    setMembers([...members]);
  };

  return (
    <div className="member-item">
      <div
        className="member-item__checkbox-container"
        data-testid={`checkbox-${member.name}`}
        onClick={() => toggleCheckbox(member)}
      >
        {member.checked && (
          <div title="unselect" className="tick">
            &#10003;
          </div>
        )}
      </div>
      <div className="member-item__name">{member.name}</div>
      <div
        className="member-item__delete"
        data-testid={`delete-${member.name}`}
        onClick={() => {
          const filteredMember = members.filter(
            cur => cur.name !== member.name
          );
          setMembers([...filteredMember]);
        }}
      >
        &#10008;
      </div>
    </div>
  );
};
