import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Pairs } from "./Pairs";

describe("Pairs", () => {
  const memebrs = [
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
  ];

  it("should render Pair who", () => {
    const { getByText } = render(<Pairs members={memebrs} />);
    expect(getByText("Pair who")).toBeInTheDocument();
  });

  it("should not render memebrs on load", () => {
    const { queryByText } = render(<Pairs members={memebrs} />);
    expect(queryByText(/john/)).not.toBeInTheDocument();
    expect(queryByText(/peter/)).not.toBeInTheDocument();
    expect(queryByText(/smith/)).not.toBeInTheDocument();
  });

  it("should render members when click get pairs", () => {
    const { getByText, queryByText } = render(<Pairs members={memebrs} />);
    fireEvent.click(getByText("Get Pairs"));
    expect(queryByText(/john/)).toBeInTheDocument();
    expect(queryByText(/peter/)).toBeInTheDocument();
    expect(queryByText(/smith/)).toBeInTheDocument();
  });
});
