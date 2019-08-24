import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./Header";

describe("Header", () => {
  it("should render Header text", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Who is next")).toBeInTheDocument();
  });
});
