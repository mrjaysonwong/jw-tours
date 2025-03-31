import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
  Rating,
} from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

// internal imports
import { useGuideData } from '@/contexts/GuideProfileProvider';

const GuideDetails = () => {
  const { guide, name, guideAddress } = useGuideData();

  return (
    <Card>
      <CardMedia
        sx={{ height: 250, backgroundPosition: '25% 20%' }}
        image={guide.image?.url || '/assets/fallback_avatar.svg'}
      />
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceOutlinedIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
            {guideAddress || 'Manila, Philippines'}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <LanguageOutlinedIcon sx={{ mr: 0.5 }} />
          <Typography variant="body2">{guide.languages.join(', ')}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
          <Rating
            name="half-rating-read"
            defaultValue={4.5}
            precision={0.5}
            readOnly
            sx={{ color: '#FCC737' }}
          />
          <Typography sx={{ mx: 0.5 }}>4.5</Typography>
          <Typography
            variant="body2"
            sx={{ mx: 1, textDecoration: 'underline' }}
          >
            42 reviews
          </Typography>
        </Box>

        <Box
          sx={{
            px: 6,
            py: 1,
            my: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '30px',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography>104</Typography>
          <Typography variant="body2">Tours Delivered</Typography>
        </Box>

        <Button fullWidth variant="contained" sx={{ borderRadius: '30px' }}>
          Message {name}.
        </Button>
      </CardContent>
    </Card>
  );
};

export default GuideDetails;
