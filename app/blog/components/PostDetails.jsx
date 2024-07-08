import { Box, Typography, Avatar, Button } from '@mui/material';
import HistoryBackButton from '@/app/components/custom/buttons/HistoryBackButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { sleep } from '@/utils/helper/common';
import { formatTitle } from '@/utils/helper/formats/formatMetadata';
import { notFound } from 'next/navigation';
import SearchBar from '../components/SearchBar';

export async function fetchPostDetails(slug) {
  await sleep(1000);
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);

  if (res.status === 404) {
    notFound();
  } else if (!res.ok) {
    throw new Error('Something went wrong!');
  }

  return await res.json();
}

export default async function PostDetails({ slug }) {
  const pokemon = await fetchPostDetails(slug);
  const formattedTitle = formatTitle(pokemon.name);

  const pokemonSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  return (
    <>
      <Box
        sx={{
          mt: '4rem',
          minHeight: '100vh',
          width: 'clamp(min(100vw, 600px), 90vw, max(50vw, 600px ))',
        }}
      >
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HistoryBackButton />

          <SearchBar />
        </Box>

        <Typography
          variant="h4"
          sx={{
            my: 2,
          }}
        >
          {formattedTitle}
        </Typography>

        <Box
          sx={{
            backgroundImage:
              'url("https://w0.peakpx.com/wallpaper/964/598/HD-wallpaper-pokeball-pokeball-pokemon-go-games-pokemon.jpg")',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '140px',
            position: 'relative',
          }}
        >
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
              alt={pokemon.name}
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
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
          <Avatar
            alt="Admin"
            src="https://mui.com/static/images/avatar/3.jpg"
            sx={{
              width: 24,
              height: 24,
            }}
          />
          <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
            Admin
          </Typography>
          <Typography variant="body2" sx={{ ml: 1, color: 'gray' }}>
            May 10, 2024
          </Typography>
        </Box>

        <Box component="section" id="appearance">
          <Typography variant="h5">Appearance</Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Box>

        <Box component="section" id="abilities" sx={{ my: 2 }}>
          <Typography variant="h5">Abilities</Typography>
          <Typography>
            Ea consequuntur laudantium hic fuga voluptate ut voluptatem nobis
            est deleniti facilis a harum eligendi. In quia atque non excepturi
            aliquam ex totam nobis nam inventore voluptatem et animi quae et
            velit quod.
          </Typography>
        </Box>

        <Box component="section" id="behavior">
          <Typography variant="h5">Behavior</Typography>
          <Typography>
            Et rerum dolor non aspernatur saepe vel galisum velit rem commodi
            aliquam quo quia dicta. Et deserunt nihil in unde impedit qui
            facilis sunt et nesciunt eveniet est quas velit hic ipsum
            cupiditate! Sed necessitatibus dolores sed quaerat omnis qui esse
            sint sit soluta sequi aut sequi sint sit totam harum. 33 quibusdam
            vero est voluptate deserunt in voluptas cumque a molestiae enim et
            cumque illum et sint tenetur.
          </Typography>
        </Box>

        <Box component="section" id="conclusion" sx={{ mt: 2 }}>
          <Typography variant="h5">Conclusion</Typography>
          <Typography>
            Non corrupti sunt quo repellat totam et earum omnis qui asperiores
            sunt. Qui Quis dolores ea voluptatem corrupti et autem consequatur
            et quidem sint est veritatis placeat.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThumbUpOutlinedIcon color="primary" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              999+
            </Typography>
          </Box>
          <Button
            startIcon={<ShareIcon />}
            disableRipple
            sx={{
              '&:hover': {
                background: 'none',
              },
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </>
  );
}
