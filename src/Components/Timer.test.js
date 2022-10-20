import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getMins, getSeconds, Timer } from "./Timer";

describe("Time", () => {
  test("onload should show 0:0", () => {
    const { queryByLabelText } = render(<Timer />);
    const mins = queryByLabelText("mins");
    const seconds = queryByLabelText("mins");
    expect(mins.value).toBe("0");
    expect(seconds.value).toBe("0");
  });

  test("press + should increase timer by 1 min", () => {
    const { queryByText, queryByLabelText } = render(<Timer />);

    fireEvent.click(queryByText("+"));
    expect(queryByLabelText("mins").value).toBe("1");

    fireEvent.click(queryByText("+"));
    expect(queryByLabelText("mins").value).toBe("2");
  });

  test("press - should decrease timer by 1 min", () => {
    const { queryAllByText, queryByText, queryByLabelText } = render(<Timer />);

    fireEvent.click(queryByText("+"));
    expect(queryByLabelText("mins").value).toBe("1");
    expect(queryByLabelText("seconds").value).toBe("0");

    fireEvent.click(queryByText("-"));
    expect(queryByLabelText("mins").value).toBe("0");
  });

  test("press - should be disabled when time and secconds are both 0", () => {
    const { queryByText, queryByLabelText } = render(<Timer />);

    fireEvent.click(queryByText("-"));
    expect(queryByLabelText("mins").value).toBe("0");
    expect(queryByLabelText("seconds").value).toBe("0");
  });

  test("on click min should be able to change min", () => {
    const { getByLabelText } = render(<Timer />);

    const plus = getByLabelText("mins");
    fireEvent.change(plus, { target: { value: "7" } });
    expect(plus.value).toBe("7");
  });

  test("on click seconds should be able to change seconds value", () => {
    const { queryByLabelText, getByLabelText } = render(<Timer />);

    const seconds = getByLabelText("seconds");
    fireEvent.change(seconds, { target: { value: "21" } });
    expect(seconds.value).toBe("21");
    expect(queryByLabelText("mins").value).toBe("0");
  });

  test("on changing seconds value, cap at 59", () => {
    const { queryByLabelText, getByLabelText } = render(<Timer />);

    const seconds = getByLabelText("seconds");
    fireEvent.change(seconds, { target: { value: "60" } });
    expect(seconds.value).toBe("59");
    expect(queryByLabelText("mins").value).toBe("0");
  });

  describe("getMins", () => {
    test.each([
      [0, 0],
      [59, 0],
      [60, 1],
      [121, 2],
    ])("given %s should return %s", (input, output) => {
      expect(getMins(input)).toBe(output);
    });
  });

  describe("getSeconds", () => {
    test.each([
      [0, 0],
      [0.01, 1],
      [59, 59],
      [60, 0],
      [121, 1],
    ])("given %s should return %s", (input, output) => {
      expect(getSeconds(input)).toBe(output);
    });
  });
});
