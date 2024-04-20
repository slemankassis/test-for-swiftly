import Character from "@/types/Character";
import axios from "axios";
import { useEffect, useState } from "react";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(
        "https://swapi.dev/api/people/?format=json"
      );
      const characterData = response.data.results;

      const characterPromises = characterData.map(async (character: any) => {
        const homeworldResponse = await axios.get(character.homeworld);
        const speciesResponse = await axios.get(character.species);

        character.homeworld = homeworldResponse.data.name;
        character.species = speciesResponse.data.name;

        return character;
      });

      const updatedCharacters = await Promise.all(characterPromises);
      setCharacters(updatedCharacters);
    } catch (error) {
      console.error("Error fetching characters:", error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return characters;
};

export default useCharacters;
