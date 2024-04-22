import { useState, useMemo, useCallback } from "react";
import { TextField, Typography, List, Container } from "@mui/material";
import CharacterCard from "@/components/CharacterCard/CharacterCard";
import useCharacters from "@/hooks/useCharacters";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const { characters } = useCharacters();
  const debounce = useDebounce(setSearch, 300);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debounce(event.target.value);
    },
    [debounce]
  );

  const filteredCharacters = useMemo(
    () =>
      characters.filter(
        (character) =>
          character.name.toLowerCase().includes(search.toLowerCase()) ||
          character.homeworld?.toLowerCase().includes(search.toLowerCase()) ||
          (character.species &&
            character.species.some((specie) =>
              specie.toLowerCase().includes(search.toLowerCase())
            ))
      ),
    [characters, search]
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Star Wars Character Directory
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      {filteredCharacters.length === 0 ? (
        <Typography variant="body1" align="center">
          No results found
        </Typography>
      ) : (
        <List>
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))}
        </List>
      )}
    </Container>
  );
}
