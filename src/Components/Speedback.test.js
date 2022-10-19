import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  Speedback,
  getSpeedbackPairs,
  extractCheckedMembers,
} from "./Speedback";

describe("Speedback", () => {
  describe("getSpeedbackPairs", () => {
    const cases = [
      [["a"], [[["a", undefined]]]],
      [["a", "b"], [[["a", "b"]]]],
      [
        ["a", "b", "c", "d"],
        [
          [
            ["a", "d"],
            ["b", "c"],
          ],
          [
            ["a", "b"],
            ["c", "d"],
          ],
          [
            ["a", "c"],
            ["d", "b"],
          ],
        ],
      ],
      [
        ["a", "b", "c", "d", "e"],
        [
          [
            ["a", undefined],
            ["b", "e"],
            ["c", "d"],
          ],
          [
            ["a", "b"],
            ["c", undefined],
            ["d", "e"],
          ],
          [
            ["a", "c"],
            ["d", "b"],
            ["e", undefined],
          ],
          [
            ["a", "d"],
            ["e", "c"],
            [undefined, "b"],
          ],
          [
            ["a", "e"],
            [undefined, "d"],
            ["b", "c"],
          ],
        ],
      ],
    ];
    test.each(cases)("given %s should reutrn %s", (input, expected) => {
      expect(getSpeedbackPairs(input)).toEqual(expected);
    });
  });

  describe("extractCheckedMembers", () => {
    const cases = [
      [[{ checked: true, name: "ab" }], ["ab"]],
      [
        [
          { checked: false, name: "ab" },
          { checked: true, name: "aa" },
        ],
        ["aa"],
      ],
    ];
    test.each(cases)("given %s should return %s", (input, expected) => {
      expect(extractCheckedMembers(input)).toEqual(expected);
    });
  });

  describe("Speedback", () => {
    const members = [
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

    test("should render with start button", () => {
      const { queryByText } = render(<Speedback members={members} />);
      expect(queryByText("start")).toBeInTheDocument();
    });

    test("should render with pair without previous button on first page", () => {
      const { queryByText } = render(<Speedback members={members} />);
      fireEvent.click(queryByText("start"));

      expect(queryByText("start")).not.toBeInTheDocument();
      expect(queryByText("previous")).not.toBeInTheDocument();
      expect(queryByText("next")).toBeInTheDocument();
      expect(queryByText("1/3")).toBeInTheDocument();
    });

    test("should render with pair previous button on second page", () => {
      const { queryByText } = render(<Speedback members={members} />);
      fireEvent.click(queryByText("start"));
      fireEvent.click(queryByText("next"));

      expect(queryByText("start")).not.toBeInTheDocument();
      expect(queryByText("previous")).toBeInTheDocument();
      expect(queryByText("next")).toBeInTheDocument();
      expect(queryByText("2/3")).toBeInTheDocument();
    });

    test("should render start after last page", () => {
      const { queryByText } = render(<Speedback members={members} />);
      fireEvent.click(queryByText("start"));
      fireEvent.click(queryByText("next"));
      fireEvent.click(queryByText("next"));
      fireEvent.click(queryByText("next"));

      expect(queryByText("start")).toBeInTheDocument();
      expect(queryByText("previous")).not.toBeInTheDocument();
      expect(queryByText("next")).not.toBeInTheDocument();
    });

    test("should not render start and previous when back to first page", () => {
      const { queryByText } = render(<Speedback members={members} />);
      fireEvent.click(queryByText("start"));
      fireEvent.click(queryByText("next"));
      fireEvent.click(queryByText("previous"));

      expect(queryByText("start")).not.toBeInTheDocument();
      expect(queryByText("previous")).not.toBeInTheDocument();
      expect(queryByText("next")).toBeInTheDocument();
      expect(queryByText("1/3")).toBeInTheDocument();
    });
  });
});
