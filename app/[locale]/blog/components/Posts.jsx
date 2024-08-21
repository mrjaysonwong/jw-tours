import Link from 'next/link';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card as MUICard,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
} from '@mui/material';
import { sleep } from '@/utils/helper/common';
import PaginationControls from './PaginationControls';
import HistoryBackButton from '@/app/components/custom/buttons/HistoryBackButton';
import SearchBar from './SearchBar';
import { formatTitle } from '@/utils/helper/formats/formatMetadata';
import { Custom404Page } from '@/app/components/custom/error/404';
import CustomError from '@/app/components/custom/error';

async function fetchPosts(newOffset, pageLimit) {
  try {
    await sleep(1000);
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${newOffset}&limit=${pageLimit}`
    );

    if (!res.ok) {
      return { statusText: res.statusText, status: res.status };
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
}

function Card({ pokemon }) {
  const splitPath = pokemon.url.split('/');
  const pokemonId = splitPath[splitPath.length - 2];
  const formattedTitle = formatTitle(pokemon.name);

  const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <Grid item xs={12} md={4} lg={4}>
      <MUICard sx={{ a: { color: 'inherit' } }}>
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

            <CardContent>
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
      </MUICard>
    </Grid>
  );
}

export default async function Posts({ searchParams }) {
  let pokemons;
  let totalCount;

  try {
    const pageNum = searchParams.page;

    const pageLimit = 12;
    const newOffset = (pageNum - 1) * pageLimit;

    pokemons = await fetchPosts(newOffset, pageLimit);

    if (pokemons.status === 404) {
      return <Custom404Page resource="resource" />;
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
    <MainContainer>
      <Box
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
        sx={{
          my: 5,
        }}
      >
        <Grid container spacing={6}>
          {pokemons?.results.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} />
          ))}
        </Grid>
      </Box>
      <PaginationControls totalCount={totalCount} />
    </MainContainer>
  );
}
