import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./";

jest.mock("../hooks/useCharacters", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    characters: [
      { name: "Luke Skywalker", homeworld: "Tatooine", species: ["Human"] },
      { name: "Darth Vader", homeworld: "Tatooine", species: ["Human"] },
      {
        name: "Yoda",
        homeworld: "Unknown",
        species: ["Yoda's species", "Human"],
      },
    ],
  })),
}));

jest.mock("../hooks/useDebounce", () => ({
  __esModule: true,
  default: jest.fn((callback: Function, delay: number) => {
    return (value: string) => callback(value);
  }),
}));

describe("Home component", () => {
  test("renders the search input", () => {
    render(<Home />);
    const searchInput = screen.getByLabelText("Search");
    expect(searchInput).toBeDefined();
  });

  test("filters characters based on search input", () => {
    render(<Home />);
    const searchInput = screen.getByLabelText("Search");

    fireEvent.change(searchInput, { target: { value: "Luke" } });

    const lukeElement = screen.getByText("Luke Skywalker");
    const darthVaderElement = screen.queryByText("Darth Vader");

    expect(lukeElement).toBeDefined();
    expect(darthVaderElement).toBeNull();
  });

  test('displays "No results found" when no characters match the search', () => {
    render(<Home />);
    const searchInput = screen.getByLabelText("Search");

    fireEvent.change(searchInput, { target: { value: "Anakin" } });

    const noResultsElement = screen.getByText("No results found");
    expect(noResultsElement).toBeDefined();
  });
});
