import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Slide,
  Divider,
  Typography,
  Box,
  Avatar,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
  Tooltip,
  IconButton,
  AppBar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchPostDetails } from './PostDetails';
import AlertMessage from '@/components/alerts/AlertMessage';
import { useMessageStore } from '@/stores/messageStore';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SearchDialog({ open, setOpen }) {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedText] = useDebounce(text, 1000);

  const [loading, setLoading] = useState({
    showMore: false,
    initialData: false,
  });

  const [startIndex, setStartIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const resetRef = useRef(null);

  const router = useRouter();
  const { slug } = useParams();

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleClick = (searchTerm) => {
    if (searchTerm === slug) {
      setOpen(false);
    }

    router.push(`/blog/${searchTerm}`);
  };

  const handleReset = () => {
    setText('');
    setShowMore(false);

    if (resetRef.current) {
      resetRef.current.querySelector('input').focus();
      resetRef.current.querySelector('input').blur();
    }
  };

  const handleShowMore = async () => {
    setLoading({ showMore: true });

    const result = await fetchSearch(startIndex + 20);

    setSuggestions([...suggestions, ...result]);
    setStartIndex(startIndex + 20);
    setLoading({ showMore: false });

    if (result.length < 20) setShowMore(false);
  };

  const fetchSearch = useCallback(
    async (startIndex = 0) => {
      try {
        const response = await axios.get('/api/v1/pokemon');
        const pokemonList = response.data.results.map(
          (pokemon) => pokemon.name
        );

        const filteredList = pokemonList.filter((name) =>
          name.includes(debouncedText.toLowerCase())
        );

        const pokemonDetailsPromises = filteredList
          .slice(startIndex, startIndex + 20)
          .map(async (pokemonName) => {
            const pokemonData = await fetchPostDetails(pokemonName);
            return pokemonData;
          });

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        return pokemonDetails;
      } catch (error) {
        throw error;
      }
    },
    [debouncedText]
  );

  const fetchSuggestions = useCallback(async () => {
    try {
      if (!debouncedText) {
        setSuggestions([]);
        setStartIndex(0);
        return;
      }

      setLoading({ initialData: true });

      const result = await fetchSearch();

      setSuggestions(result);
      setShowMore(result?.length >= 20);
      setLoading({ initialData: false });
    } catch (error) {
      handleAlertMessage(
        'An error occured. Clear search query and try again.',
        'error'
      );
    }
  }, [debouncedText, fetchSearch, handleAlertMessage]);

  useEffect(() => {
    fetchSuggestions();
  }, [fetchSuggestions]);

  return (
    <>
      <Dialog
        disableRestoreFocus
        open={open}
        onClose={handleOnClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            height: suggestions?.length <= 1 ? '45vh' : '61vh',
          },
        }}
      >
        <DialogContent dividers sx={{ borderTop: 'none' }}>
          <AppBar
            elevation={3}
            position="sticky"
            color="inherit"
            sx={{ borderRadius: '6px' }}
          >
            <Autocomplete
              loading={loading.initialData}
              loadingText={`Loading...`}
              noOptionsText={`Can't find it? Be specific in searching.`}
              options={suggestions}
              getOptionLabel={(option) => `${option.name}`}
              renderOption={(props, option) => {
                // destructure key from props
                // Box key prop first
                const { key, ...restProps } = props;
                return (
                  <Box
                    key={key}
                    {...restProps}
                    onClick={() => handleClick(option.name)}
                    component="li"
                    sx={{
                      '& > img': { mr: 2, flexShrink: 0 },
                      display: 'flex',
                      alignItems: 'center',
                      ':hover': {
                        bgcolor: '	rgb(211,211,211, 0.4)',
                        cursor: 'pointer',
                      },
                    }}
                  >
                    <Avatar
                      alt={option.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${option.id}.png`}
                      sx={{ width: 32, height: 32, my: 1, mx: 2 }}
                    />
                    {option.name}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    fullWidth
                    label="Search Blog"
                    ref={resetRef}
                    onChange={(e) => setText(e.target.value)}
                    autoComplete="off"
                    sx={{
                      position: 'relative',
                    }}
                    inputProps={{ ...params.inputProps, autoFocus: true }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          {showMore && (
                            <Button
                              size="small"
                              color="inherit"
                              variant="outlined"
                              onClick={handleShowMore}
                              disabled={loading.showMore}
                              sx={{ fontSize: '10px' }}
                              startIcon={
                                loading.showMore ? (
                                  <CircularProgress size={18} />
                                ) : (
                                  <SearchIcon />
                                )
                              }
                            >
                              Show More
                            </Button>
                          )}
                        </>
                      ),
                    }}
                  />

                  {debouncedText && (
                    <Tooltip title="Clear the query" arrow>
                      <IconButton
                        disableRipple
                        onClick={handleReset}
                        sx={{
                          position: 'absolute',
                          right: '40px',
                          top: '12px',
                          svg: {
                            fontSize: '1rem',
                          },
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </>
              )}
              sx={{
                width: {
                  xs: '60vw',
                  md: '30vw',
                  input: {
                    marginRight: '2rem',
                  },
                },
              }}
              slotProps={{
                paper: {
                  elevation: 2,
                },
              }}
            />
          </AppBar>

          {!debouncedText && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '70%',
                pt: 5,
              }}
            >
              <Typography>No recent searches</Typography>
            </Box>
          )}

          {debouncedText &&
            !loading.initialData &&
            suggestions?.length === 0 && (
              <Box
                sx={{
                  width: { xs: '50vw', lg: '400px' },
                  margin: 'auto',
                  pt: 10,
                  textAlign: 'center',
                }}
              >
                <Typography>No results for</Typography>
                <Typography>
                  &quot;<b>{debouncedText}</b>&quot;
                </Typography>
              </Box>
            )}
        </DialogContent>

        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button onClick={handleOnClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
