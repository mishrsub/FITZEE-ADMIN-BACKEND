import PropTypes from 'prop-types';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewTotalNews = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total News
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            {/* <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon> */}
            <img src={`https://cdn-icons-png.flaticon.com/128/2273/2273190.png`} alt="Blogs" style={{ width: '100%', height: '100%' }} />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalNews.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object
};
