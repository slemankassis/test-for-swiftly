import Character from "@/types/Character";
import axios from "axios";
import { useEffect, useState } from "react";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataCache, setDataCache] = useState<{ [key: string]: any }>({});

  const fetchData = async (urls: string[]) => {
    const promises = urls.map(async (url) => {
      if (dataCache[url]) {
        return dataCache[url];
      }

      const response = await axios.get(url);
      dataCache[url] = response.data;
      setDataCache({ ...dataCache });

      return response.data;
    });

    const speciesData = await Promise.all(promises);
    return speciesData.map((data) => data?.name);
  };

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}people`
      );
      const characterData = response.data;

      const characterPromises = characterData.map(
        async (character: Partial<Character>) => {
          const homeworld =
            character.homeworld && (await fetchData([character.homeworld]));
          const species =
            character.species && (await fetchData(character.species));

          return {
            name: character.name,
            homeworld: homeworld?.[0],
            species,
          };
        }
      );

      const updatedCharacters = await Promise.all(characterPromises);
      setCharacters(updatedCharacters);
      setError(null);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setError("Failed to fetch characters");
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return { characters, error };
};

export default useCharacters;
