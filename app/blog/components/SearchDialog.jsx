import React, { forwardRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  InputBase,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { fetchPostDetails } from './PostDetails';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog({ open, setOpen }) {
  const [text, setText] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const router = useRouter();

  const [debouncedText] = useDebounce(text, 1000);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSearch = async () => {
    if (!debouncedText) {
      return;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`);

    const data = await res.json();
    const pokemonList = data.results.map((pokemon) => pokemon.name);
    const filteredList = pokemonList.filter((name) =>
      name.includes(debouncedText.toLowerCase())
    );

    // Fetch details for each filtered Pokémon
    const pokemonDetailsPromises = filteredList.map(async (pokemonName) => {
      const pokemonData = await fetchPostDetails(pokemonName);
      return pokemonData;
    });

    // Wait for all details to be fetched
    const pokemonDetails = await Promise.all(pokemonDetailsPromises);

    return pokemonDetails;
  };

  const handleOnClick = (pokemon) => {
    router.push(`/blog/${pokemon}`);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      const result = await fetchSearch(debouncedText);

      setPokemons(result);
    };

    fetchPokemons();
  }, [debouncedText]);

  return (
    <>
      <Dialog disableRestoreFocus open={open} TransitionComponent={Transition}>
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <SearchIcon />

            <InputBase
              autoFocus
              placeholder="Search Blog"
              inputProps={{ 'aria-label': 'search blog' }}
              onChange={(e) => setText(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />

            <Divider sx={{ height: 28, mx: 1 }} orientation="vertical" />
            <IconButton aria-label="close-modal" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {pokemons &&
          (pokemons.length < 1 ? (
            <Box sx={{ mx: 2, my: 4 }}>
              <Typography>
                No results for &quot;<b>{debouncedText}</b>&quot;
              </Typography>
            </Box>
          ) : (
            <>
              <List>
                {pokemons.map((pokemon) => (
                  <ListItemButton
                    key={pokemon.name}
                    onClick={() => handleOnClick(pokemon.name)}
                  >
                    <Avatar
                      alt={pokemon.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                      sx={{ width: 64, height: 64 }}
                    />
                    <ListItemText
                      primary={pokemon.name}
                      secondary={`Weight: ${pokemon.weight}`}
                      sx={{ ml: 1 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </>
          ))}
      </Dialog>
    </>
  );
}
