import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Members } from "./Members";

describe("Members", () => {
  let mockMembers;
  let setMembers;
  window.alert = jest.fn();
  beforeEach(() => {
    mockMembers = [
      { name: "John", checked: false },
      { name: "Peter", checked: false },
    ];
    setMembers = jest.fn();
  });

  const renderMembers = (mems = mockMembers) => {
    return render(<Members members={mems} setMembers={setMembers} />);
  };

  it("should display list of added memebers", () => {
    const { getByText } = renderMembers();

    expect(getByText("John")).toBeInTheDocument();
    expect(getByText("Peter")).toBeInTheDocument();
  });

  it("should set john to true if is not checked", async () => {
    const { getByTestId } = renderMembers();
    const checkBox = getByTestId("checkbox-John");
    fireEvent.click(checkBox);
    expect(setMembers).toHaveBeenCalledWith([
      { name: "John", checked: true },
      { name: "Peter", checked: false },
    ]);
  });

  it("should set john value to false if is checked", () => {
    mockMembers[0].checked = true;
    const { getByTestId } = renderMembers();
    const checkBox = getByTestId("checkbox-John");
    fireEvent.click(checkBox);
    expect(setMembers).toHaveBeenCalledWith([
      { name: "John", checked: false },
      { name: "Peter", checked: false },
    ]);
  });

  it("should call setMembers without deleted item", () => {
    const { getByTestId } = renderMembers();
    let member = mockMembers[0];
    const deleteBtn = getByTestId(`delete-${member.name}`);
    fireEvent.click(deleteBtn);
    expect(setMembers).toHaveBeenCalledWith(
      expect.not.arrayContaining([member])
    );
  });

  it("should be able to add members", async () => {
    const { getByTestId, getByLabelText } = renderMembers();
    const addMemberInput = getByLabelText("members-name");
    const addMemberBtn = getByTestId("add-btn");
    fireEvent.change(addMemberInput, { target: { value: "James" } });
    fireEvent.click(addMemberBtn);
    expect(setMembers).toHaveBeenCalledWith(
      expect.arrayContaining([
        {
          name: "James",
          checked: true,
        },
      ])
    );
  });

  it("should not add member if member name already exist", () => {
    const name = mockMembers[0].name;
    const { getByTestId, getByLabelText } = renderMembers();
    const addMemberInput = getByLabelText("members-name");
    const addMemberBtn = getByTestId("add-btn");
    fireEvent.change(addMemberInput, { target: { value: name } });
    fireEvent.click(addMemberBtn);
    expect(setMembers).not.toHaveBeenCalled();
  });

  it("should not add member name less than 2 characters", () => {
    const { getByTestId, getByLabelText } = renderMembers();
    const addMemberInput = getByLabelText("members-name");
    const addMemberBtn = getByTestId("add-btn");
    fireEvent.change(addMemberInput, { target: { value: "1" } });
    fireEvent.click(addMemberBtn);
    expect(setMembers).not.toHaveBeenCalled();
  });
});
