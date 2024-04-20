import { useEffect, useState, useMemo, useCallback } from 'react';
import { Grid, TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

interface Character {
  name: string;
  homeworld?: string;
  species?: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [characters, setCharacters] = useState<Character[]>([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://swapi.dev/api/people/?format=json');
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
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleSearchChange = useCallback(
    debounce((searchTerm: string) => {
      setSearch(searchTerm);
    }, 300),
    []
  );

  const filteredCharacters = useMemo(
    () =>
      characters.filter(
        (character) =>
          character.name.toLowerCase().includes(search.toLowerCase()) ||
          character.homeworld?.toLowerCase().includes(search.toLowerCase()) ||
          character.species?.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  );

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom>
        Star Wars Character Directory
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(event) => handleSearchChange(event.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {filteredCharacters.length === 0 ? (
        <Typography variant="body1" align="center">
          No results found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredCharacters.map((character, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>
                  <Typography variant="h5">{character.name}</Typography>
                  {character.homeworld && (
                    <Typography variant="body1">Homeworld: {character.homeworld}</Typography>
                  )}
                  {character.species && <Typography variant="body1">Species: {character.species}</Typography>}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
