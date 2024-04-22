import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useCharacters from "./useCharacters";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useCharacters", () => {
  test("fetches and updates characters correctly", async () => {
    const mockCharacterData = {
      results: [
        {
          name: "Luke Skywalker",
          homeworld: "http://swapi.dev/api/planets/1/",
          species: "http://swapi.dev/api/species/1/",
        },
        {
          name: "Darth Vader",
          homeworld: "http://swapi.dev/api/planets/2/",
          species: "http://swapi.dev/api/species/1/",
        },
      ],
    };

    const mockHomeworldData = { name: "Tatooine" };
    const mockSpeciesData = { name: "Human" };

    mockedAxios.get.mockResolvedValueOnce({ data: mockCharacterData });
    mockedAxios.get.mockResolvedValueOnce({ data: mockHomeworldData });
    mockedAxios.get.mockResolvedValueOnce({ data: mockHomeworldData });
    mockedAxios.get.mockResolvedValueOnce({ data: mockSpeciesData });

    const { result } = renderHook(() => useCharacters());

    expect(result.current).toEqual([]);

    expect(result.current).toEqual([
      { name: "Luke Skywalker", homeworld: "Tatooine", species: "Human" },
      { name: "Darth Vader", homeworld: "Tatooine", species: "Human" },
    ]);

    expect(mockedAxios.get).toHaveBeenCalledTimes(4);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://swapi.dev/api/people/?format=json"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://swapi.dev/api/planets/1/"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://swapi.dev/api/planets/2/"
    );
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://swapi.dev/api/species/1/"
    );
  });

  test("handles fetch error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Failed to fetch"));

    const { result, waitForNextUpdate } = renderHook(() => useCharacters());

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching characters:",
      expect.any(Error)
    );

    expect(result.current).toEqual([]);
  });
});
