import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  TextField,
  Stack,
  Autocomplete,
  InputAdornment,
  Box,
  Typography,
  Paper,
  ListSubheader,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// internal imports
import { useSearchTours } from '@/hooks/useTours';
import { getQueryParams } from '@/utils/queryParams';

const SearchBar = ({ w = 360, handleClose = () => {} }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const { searchQuery } = getQueryParams(searchParams);

  const segments = pathname.split('/').filter(Boolean);
  const [, , d] = segments;
  const destination = d?.replace(/-/g, ' ');
  const inputValue = searchQuery || destination;

  const [searchTerm, setSearchTerm] = useState(searchQuery ?? '');
  const [debouncedText] = useDebounce(searchTerm, 700);

  const { isLoading, isError, error, tours } = useSearchTours({
    debouncedText,
  });

  const handleInputChange = (event, newValue) => {
    setSearchTerm(newValue);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (event, value) => {
    if (!value || value.custom) return;

    if (value.seeAll) {
      router.push(`/tours/search?q=${debouncedText}`);
      handleClose();
      return;
    }

    if (typeof value === 'string') {
      return;
    }

    const geoLocation = value?.geoLocation?.toLowerCase().replace(/\s+/g, '-');

    const destination = value?.destination?.name
      ?.toLowerCase()
      .replace(/\s+/g, '-');

    handleClose();
    router.push(`/tours/${geoLocation}/${destination}`);
  };

  const displayedOptions = (() => {
    if (searchTerm.trim() === ' ') return [];

    if (debouncedText && !isLoading) {
      if (tours.length > 0) {
        return [...tours.slice(0,10), { seeAll: true }];
      }

      return [
        {
          custom: true,
          label: isError ? error.message : `No results for "${debouncedText}"`,
          subLabel: isError
            ? 'Please clear input and try again'
            : 'Check your spelling, or search another term',
        },
      ];
    }

    return [];
  })();

  return (
    <Stack spacing={2} sx={{ width: w }}>
      <Autocomplete
        freeSolo
        clearIcon={searchTerm ? undefined : null}
        value={inputValue ? inputValue : ''}
        filterOptions={(x) => x}
        options={displayedOptions}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          if (option.seeAll) return searchTerm;
          if (option.custom) return option.label;
          return option.destination?.name || option?.geoLocation;
        }}
        loading={isLoading}
        onInputChange={handleInputChange}
        onChange={handleSelect}
        PaperComponent={({ children }) => (
          <Paper sx={{ mt: 1 }}>
            {tours.length > 0 && (
              <Typography
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 1,
                  fontWeight: 500,
                }}
              >
                All results
              </Typography>
            )}
            {children}
          </Paper>
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;

          if (option.custom) {
            return (
              <ListSubheader
                key={optionProps.id}
                sx={{
                  cursor: 'default',
                  pointerEvents: 'none',
                  bgcolor: 'inherit',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {isError && <ErrorOutlineOutlinedIcon color="error" />}
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{
                      mt: 1,
                      color: (theme) =>
                        isError
                          ? theme.palette.error.main
                          : theme.palette.mode === 'light'
                          ? 'black'
                          : theme.palette.common.white,
                    }}
                  >
                    {option.label}
                  </Typography>
                </Box>

                <Typography variant="caption" color="text.secondary">
                  {option.subLabel}
                </Typography>
              </ListSubheader>
            );
          }

          if (option.seeAll) {
            return (
              <Box
                component="li"
                key={optionProps.id}
                {...optionProps}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: 'action.hover' },
                }}
              >
                <SearchIcon color="secondary" />
                <Typography variant="body2">
                  See all results for{' '}
                  <span style={{ fontWeight: 510 }}>
                    &quot;{debouncedText}&quot;
                  </span>
                </Typography>
              </Box>
            );
          }

          // normal search result item
          return (
            <Box
              component="li"
              key={optionProps.id}
              {...optionProps}
              sx={{ display: 'flex' }}
            >
              <PlaceOutlinedIcon />
              <Box
                sx={{ display: 'block', textTransform: 'capitalize', px: 1 }}
              >
                <Typography variant="body2" fontWeight={500}>
                  {option.destination?.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    {option.geoLocation} •
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {option.destination?.country}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a destination"
            onChange={handleChange}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start" sx={{ ml: 1, mr: 0 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={(theme) => ({
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
              '& input::placeholder': {
                color: theme.palette.mode === 'light' ? '#333' : 'white',
                opacity: 0.6,
              },
            })}
          />
        )}
      />
    </Stack>
  );
};

export default SearchBar;
