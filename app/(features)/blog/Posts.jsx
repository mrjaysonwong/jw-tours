import Link from 'next/link';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { sleep } from '@/utils/common';
import PaginationControls from './PaginationControls';
import HistoryBackButton from '@/components/buttons/HistoryBackButton';
import SearchBar from './SearchBar';
import { formatTitle } from '@/utils/formats/formatMetadata';
import Custom404 from '@/components/errors/Custom404';
import CustomError from '@/components/errors/CustomError';
import { StyledGridCard } from '@/components/styled/StyledCards';

async function fetchPosts(newOffset, pageLimit) {
  try {
    await sleep(1000);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=${pageLimit}`
    );

    const { statusText, status } = res;

    if (!res.ok) {
      return { statusText, status };
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}

const CardItem = ({ pokemon }) => {
  const splitPath = pokemon.url.split('/');
  const pokemonId = splitPath[splitPath.length - 2];
  const formattedTitle = formatTitle(pokemon.name);

  const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <StyledGridCard>
        <Link href={`/blog/${pokemon.name}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://w0.peakpx.com/wallpaper/964/598/HD-wallpaper-pokeball-pokeball-pokemon-go-games-pokemon.jpg"
              alt={pokemon.name}
              sx={{
                position: 'relative',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '140px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(1px)',
                top: 0,
              }}
            >
              <Avatar
                alt={formattedTitle}
                src={pokemonSprite}
                sx={{
                  width: 100,
                  height: 100,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </Box>

            <CardContent sx={{ minHeight: '160px' }}>
              <Typography gutterBottom variant="h5" component="div">
                {formattedTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
      </StyledGridCard>
    </Grid>
  );
};

export default async function Posts({ searchParams }) {
  let pokemons;
  let totalCount;

  try {
    const pageNum = searchParams.page;

    const pageLimit = 12;
    const newOffset = (pageNum - 1) * pageLimit;

    pokemons = await fetchPosts(newOffset, pageLimit);

    if (pokemons.status === 404) {
      return <Custom404 resource="resource" />;
    } else if (pokemons.status === 500) {
      return <CustomError />;
    }

    totalCount = Math.ceil(pokemons.count / pageLimit);
    const pageNums = ['0', ''];

    if (pageNums.includes(pageNum) || pageNum > totalCount) {
      return (
        <Container sx={{ mt: '7rem', minHeight: '90vh' }}>
          <HistoryBackButton />
          <Typography sx={{ my: 2 }}>Nothing found here.</Typography>
        </Container>
      );
    }
  } catch (error) {
    return <CustomError />;
  }

  return (
    <StyledContainer>
      <Box
        component="section"
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4">Blog</Typography>

        <SearchBar />
      </Box>

      <Box
        component="section"
        sx={{
          my: 5,
        }}
      >
        <Grid container spacing={3}>
          {pokemons?.results.map((pokemon) => (
            <CardItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </Grid>
      </Box>

      <PaginationControls totalCount={totalCount} />
    </StyledContainer>
  );
}
