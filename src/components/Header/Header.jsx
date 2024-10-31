import React from 'react';
import { AppBar, Autocomplete, Toolbar, Typography, Box, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0, 2),
  marginLeft: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

function Header() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Title variant="h5">Travel Advisor</Title>
        <Box display="flex">
          <Typography variant="h6">Explore New Places</Typography>
          <SearchWrapper>
            <SearchIcon style={{ marginRight: '8px' }} />
            <Autocomplete
              freeSolo
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search..."
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    style: { width: '200px', color: 'inherit' },
                  }}
                />
              )}
            />
          </SearchWrapper>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Header;
