import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)
import Home from "../src/pages/index";

test("should show home page", () => {
  render(<Home />);
  const input = screen.getByLabelText("Search");
  // Events and assertions...
});
