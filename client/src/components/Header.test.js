import { screen, render } from "@testing-library/react";
import { Wrapper } from "./Wrapper";
import Header from "./Header";

it("Should display header", () => {
  render(<Header />, { wrapper: Wrapper });
});
