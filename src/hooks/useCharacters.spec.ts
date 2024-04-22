import { renderHook, act } from "@testing-library/react-hooks";
import useCharacters from "./useCharacters";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useCharacters", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches characters and populates character data", async () => {
    const mockCharacterData = [
      {
        name: "Luke Skywalker",
        homeworld: "https://swapi.info/api/planets/1",
        species: ["https://swapi.info/api/species/1"],
      },
      {
        name: "C-3PO",
        homeworld: "https://swapi.info/api/planets/1",
        species: ["https://swapi.info/api/species/2"],
      },
    ];

    const mockHomeworldData = {
      name: "Tatooine",
    };

    const mockSpeciesData = {
      name: "Human",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockCharacterData });
    mockedAxios.get.mockResolvedValue({ data: mockSpeciesData });
    mockedAxios.get.mockResolvedValue({ data: mockHomeworldData });

    const { result, waitForNextUpdate } = renderHook(() => useCharacters());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toBeNull();
    expect(result.current.characters).toEqual([
      {
        name: "Luke Skywalker",
        homeworld: "Tatooine",
        species: ["Tatooine"],
      },
      {
        name: "C-3PO",
        homeworld: "Tatooine",
        species: ["Tatooine"],
      },
    ]);
  });

  it("handles fetch errors", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Failed to fetch"));

    const { result, waitForNextUpdate } = renderHook(() => useCharacters());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.error).toBe("Failed to fetch characters");
    expect(result.current.characters).toEqual([]);
  });
});
