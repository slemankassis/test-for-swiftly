import { Typography, ListItem, ListItemText } from "@mui/material";
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
        secondary={
          <>
            {character.homeworld && (
              <Typography variant="body1">
                Homeworld: {character.homeworld}
              </Typography>
            )}
            {character.species && (
              <Typography variant="body1">
                Species: {character.species}
              </Typography>
            )}
          </>
        }
      />
    </ListItem>
  );
};

export default CharacterCard;
