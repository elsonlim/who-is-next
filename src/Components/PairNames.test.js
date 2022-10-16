import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { PairNames } from "./PairNames";

describe("PairNames", () => {
  it("should render both names", () => {
    const { queryByText } = render(
      <PairNames name1={"john"} name2={"peter"} />
    );
    expect(queryByText("john")).toBeInTheDocument();
    expect(queryByText("peter")).toBeInTheDocument();
  });

  it("should render both names", () => {
    const { queryByText } = render(<PairNames name1={"john"} />);
    expect(queryByText("john")).toBeInTheDocument();
    expect(queryByText("peter")).not.toBeInTheDocument();
  });
});
