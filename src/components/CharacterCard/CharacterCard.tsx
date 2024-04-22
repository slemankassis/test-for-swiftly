import { Typography, ListItem, ListItemText, Box } from "@mui/material";
import Character from "@/types/Character";

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <ListItem
      style={{
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px 0",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <ListItemText
        primary={character.name}
        disableTypography
        secondary={
          <Box display="flex" flexDirection="column">
            {character.homeworld && (
              <Typography variant="body1" component="span">
                Homeworld: {character.homeworld}
              </Typography>
            )}
            {!!character.species?.length && (
              <Typography variant="body1" component="span">
                Species:
                {character.species?.map((specie) => (
                  <span key={specie}> {specie}</span>
                ))}
              </Typography>
            )}
          </Box>
        }
      />
    </ListItem>
  );
};

export default CharacterCard;
