'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Avatar,
  Skeleton,
  IconButton,
  CircularProgress,
  Pagination,
} from '@mui/material';
import { fetchPosts } from './Posts';

export function Card({ pokemon }) {
  const splitPath = pokemon.url.split('/');
  const pokemonId = splitPath[splitPath.length - 2];

  return (
    <Box sx={{ m: 3 }}>
      <Typography
        variant="h5"
        sx={{
          ':first-letter': {
            textTransform: 'capitalize',
          },
        }}
      >
        {pokemon.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={pokemon.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          sx={{ width: 100, height: 100 }}
        />
        <Typography sx={{ mx: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Box>
  );
}

export default function PostCard({ pokemons, searchParams }) {
  return (
    <>
      {pokemons?.results.map((pokemon) => (
        <Card key={pokemon.name} pokemon={pokemon} />
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={pokemons?.count}/>
      </Box>
    </>
  );
}
