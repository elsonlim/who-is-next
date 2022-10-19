import React from "react";
import { render, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./Header";
import { BrowserRouter as Router } from "react-router-dom";

describe("Header", () => {
  const renderHeader = () =>
    render(
      <Router>
        <Header />
      </Router>
    );
  it("should render Header text", () => {
    const { getByText } = renderHeader();
    expect(getByText("WHO IS NEXT")).toBeInTheDocument();
  });

  it("should render pairUp", () => {
    const { getByTestId } = renderHeader();
    expect(within(getByTestId("side")).getByText("Pairs")).toBeInTheDocument();
  });

  it("should render Who is next", () => {
    const { getByTestId } = renderHeader();
    expect(
      within(getByTestId("side")).getByText("Who is next")
    ).toBeInTheDocument();
  });
});
