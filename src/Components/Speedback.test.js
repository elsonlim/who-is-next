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
      // [["a"], [[["a", undefined]]]],
      // [["a", "b"], [[["a", "b"]]]],
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
});
