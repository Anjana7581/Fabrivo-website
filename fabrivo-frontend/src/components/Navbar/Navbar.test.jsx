import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar Component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  });
});
