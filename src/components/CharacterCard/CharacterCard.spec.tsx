import { render } from "@testing-library/react";
import CharacterCard from "./CharacterCard";
import Character from "@/types/Character";

const mockCharacter: Character = {
  name: "Luke Skywalker",
  homeworld: "Tatooine",
  species: "Human",
};

describe("CharacterCard", () => {
  test("renders character name", () => {
    const { getByText } = render(<CharacterCard character={mockCharacter} />);
    expect(getByText(mockCharacter.name)).toBeDefined();
  });

  test("renders homeworld if provided", () => {
    const { getByText } = render(<CharacterCard character={mockCharacter} />);
    expect(getByText(`Homeworld: ${mockCharacter.homeworld}`)).toBeDefined();
  });

  test("renders species if provided", () => {
    const { getByText } = render(<CharacterCard character={mockCharacter} />);
    expect(getByText(`Species: ${mockCharacter.species}`)).toBeDefined();
  });

  test("does not render homeworld if not provided", () => {
    const characterWithoutHomeworld: Character = {
      ...mockCharacter,
      homeworld: undefined,
    };
    const { queryByText } = render(
      <CharacterCard character={characterWithoutHomeworld} />
    );
    expect(queryByText(/Homeworld/)).toBeNull();
  });

  test("does not render species if not provided", () => {
    const characterWithoutSpecies: Character = {
      ...mockCharacter,
      species: undefined,
    };
    const { queryByText } = render(
      <CharacterCard character={characterWithoutSpecies} />
    );
    expect(queryByText(/Species/)).toBeNull();
  });
});
