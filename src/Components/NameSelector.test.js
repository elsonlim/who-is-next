import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { NameSelector } from "./NameSelector";

describe("NameSelector", () => {
  const renderNameSelector = () => {
    return render(<NameSelector members={[]} />);
  };
  it("should display WHO IS NEXT? if no name have been selected before", () => {
    const { getByText } = renderNameSelector();
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });

  it("should render 'Get Name' Button", () => {
    const { getByText } = renderNameSelector();
    expect(getByText("Get Name")).toBeInTheDocument();
  });

  it("should render 'Reset' Button", () => {
    const { getByText } = renderNameSelector();
    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("should show 'Add or Checked Names' when no one is in the list", () => {
    const { getByText } = render(<NameSelector members={[]} />);
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    expect(getByText("Add or Checked Names")).toBeInTheDocument();
  });

  it("should reset when no more name", () => {
    const { getByText } = render(
      <NameSelector
        members={[
          {
            name: "john",
            checked: true,
          },
          {
            name: "peter",
            checked: true,
          },
          {
            name: "smith",
            checked: true,
          },
        ]}
      />
    );
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);

    fireEvent.click(getNameBtn);
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });

  it("should reset when 'Reset' button is clicked'", () => {
    const { getByText, queryByText } = render(
      <NameSelector
        members={[
          {
            name: "john",
            checked: true,
          },
          {
            name: "peter",
            checked: true,
          },
          {
            name: "smith",
            checked: true,
          },
        ]}
      />
    );
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);
    expect(queryByText("WHO IS NEXT?")).not.toBeInTheDocument();

    const resetBtn = getByText("Reset");
    fireEvent.click(resetBtn);
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });

  it("unchecked item should not be included", async () => {
    const { findAllByText, getByText } = render(
      <NameSelector
        members={[
          { name: "john", checked: true },
          {
            name: "peter",
            checked: false,
          },
        ]}
      />
    );
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    expect(await findAllByText("john")).toHaveLength(2);

    fireEvent.click(getNameBtn);
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });

  it("should not include name even if uncheck in the middle of a random list", () => {
    const { container, getByText, queryByText } = render(
      <NameSelector
        members={[
          { name: "john", checked: true },
          { name: "peter", checked: true },
          { name: "sally", checked: true },
        ]}
      />
    );
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    expect(queryByText(/WHO IS NEXT?/)).toBe(null);
    render(
      <NameSelector
        members={[
          { name: "john", checked: false },
          { name: "peter", checked: false },
          { name: "sally", checked: false },
        ]}
      />,
      { container }
    );
    fireEvent.click(getNameBtn);
    expect(getByText("Add or Checked Names")).toBeInTheDocument();
  });

  it("should remove name and include new name in list", async () => {
    const { container, getByText, queryByText, findAllByText } = render(
      <NameSelector
        members={[
          { name: "john", checked: true },
          { name: "peter", checked: true },
          { name: "sally", checked: true },
        ]}
      />
    );
    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    expect(queryByText(/WHO IS NEXT?/)).toBe(null);
    render(<NameSelector members={[{ name: "smith", checked: true }]} />, {
      container,
    });
    fireEvent.click(getNameBtn);
    expect(await findAllByText("smith")).toHaveLength(2);

    fireEvent.click(getNameBtn);
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });

  it("should remove name and include new name in list", () => {
    const members = [
      { name: "john", checked: true },
      { name: "peter", checked: true },
      { name: "sally", checked: true },
    ];

    const { container, getByText } = render(
      <NameSelector members={[...members]} />
    );

    const getNameBtn = getByText("Get Name");
    fireEvent.click(getNameBtn);
    render(<NameSelector members={members} />, { container });

    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);
    fireEvent.click(getNameBtn);
    expect(getByText("WHO IS NEXT?")).toBeInTheDocument();
  });
});
