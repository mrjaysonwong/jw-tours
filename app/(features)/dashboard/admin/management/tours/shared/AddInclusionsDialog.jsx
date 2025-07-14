import React, { useState, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
  Grid,
  Box,
  TextField,
  Chip,
  Container,
} from '@mui/material';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';

// Internal imports
import { useTourFormContext } from './CardForm';
import ErrorText from '@/components/errors/ErrorText';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

Transition.displayName = 'Transition';

const PLACEHOLDERS = {
  Activities: 'Ex: Island hopping, Snorkeling tour',
  Equipments: 'Ex: Mask and Snorkel, Life Jacket',
  Transport: 'Ex: Air-conditioned vehicle',
  Meals: 'Ex: Buffet lunch',
  Accommodation: 'Ex: Standard room',
};

const DEFAULT_INCLUSIONS = Object.keys(PLACEHOLDERS).map((label) => ({
  label,
  items: [],
}));

const AddInclusionsDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  fields,
  append,
  remove,
  watchedInclusions,
}) => {
  const { control, errors, setValue } = useTourFormContext();
  const [newItemInput, setNewItemInput] = useState({});
  const hasInitialized = useRef(false);

  const handleInputChange = (index, value) => {
    setNewItemInput((prev) => ({ ...prev, [index]: value }));
  };

  useEffect(() => {
    if (isDialogOpen && !hasInitialized.current && fields.length === 0) {
      DEFAULT_INCLUSIONS.forEach(append);
      hasInitialized.current = true;
    }
  }, [isDialogOpen, fields.length, append]);

  const handleClose = () => setIsDialogOpen(false);
  const handleReset = () => {
    hasInitialized.current = false;
    remove();
  };

  const handleAddItem = (index) => {
    const newItem = newItemInput[index]?.trim();
    if (!newItem) return;

    const currentItems = watchedInclusions?.[index]?.items || [];

    setValue(`inclusions.${index}.items`, [...currentItems, newItem], {
      shouldValidate: true,
    });
    setNewItemInput((prev) => ({ ...prev, [index]: '' }));
  };

  const handleRemoveItem = (index, itemIndex) => {
    setValue(
      `inclusions.${index}.items`,
      watchedInclusions?.[index]?.items?.filter((_, i) => i !== itemIndex)
    );
  };

  return (
    <Dialog
      fullScreen
      open={isDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }} elevation={1}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6">
            Add Inclusions
          </Typography>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 2 }}>
        <Typography color="#0288d1">
          - Remove any inapplicable inclusion types.
        </Typography>
        <Typography color="error">
          - Activities Inclusion is required.
        </Typography>
      </Container>

      <Container sx={{ textAlign: 'right', mt: 2 }}>
        <Button variant="outlined" onClick={handleReset}>
          Reset to default
        </Button>
      </Container>

      <Container sx={{ mb: 2 }}>
        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{
              py: 2,
              ':not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 1,
              }}
            >
              <Typography variant="h6">Inclusion Type {index + 1}</Typography>
              <IconButton onClick={() => remove(index)} color="warning">
                <DeleteIcon />
              </IconButton>
            </Box>

            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={12} md={3}>
                <Controller
                  name={`inclusions.${index}.label`}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      label="Label"
                      fullWidth
                      error={!!errors.inclusions?.[index]?.label}
                      InputProps={{ readOnly: true }}
                    />
                  )}
                />
                <ErrorText error={errors.inclusions?.[index]?.label?.message} />
              </Grid>

              <Grid item xs={12} md={9}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    autoComplete="off"
                    size="small"
                    fullWidth
                    label="Add Item"
                    placeholder={PLACEHOLDERS[field.label]}
                    error={!!errors.inclusions?.[index]?.items}
                    value={newItemInput[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyPress={(e) =>
                      e.key === 'Enter' && handleAddItem(index)
                    }
                  />
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddItem(index)}
                  >
                    Add
                  </Button>
                </Box>
                <ErrorText error={errors.inclusions?.[index]?.items?.message} />

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  {watchedInclusions?.[index]?.items?.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={item}
                      onDelete={() => handleRemoveItem(index, itemIndex)}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>
    </Dialog>
  );
};

AddInclusionsDialog.displayName = 'AddInclusionsDialog';

export default React.memo(AddInclusionsDialog);
