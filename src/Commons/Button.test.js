import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

describe("Button", () => {
  test("should render Button", () => {
    const { queryByText } = render(<Button>children</Button>);

    expect(queryByText("children")).toBeInTheDocument();
  });
});
