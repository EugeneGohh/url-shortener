import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/pages/index";

describe("Home page", () => {
  it("should display the correct page title", () => {
    render(<Home />);

    const pageTitle = screen.getByRole("heading", {
      name: "Trim Your Links with Our URL Shortener!",
    });

    expect(pageTitle).toBeInTheDocument();
  });

  it("should display the Vercel logo", () => {
    render(<Home />);
    const vercelLogo = screen.getByAltText("Vercel Logo");
    expect(vercelLogo).toBeInTheDocument();
  });

  it("should display the input field", () => {
    render(<Home />);
    const inputField = screen.getByPlaceholderText("Trim Now");
    expect(inputField).toBeInTheDocument();
  });

  it("should display the reload button", () => {
    render(<Home />);
    const reloadButton = screen.getByRole("button", { name: "Get New Data" });
    expect(reloadButton).toBeInTheDocument();
  });
});
