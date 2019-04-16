import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const BrandIcon = styled(PhotoCamera)`
  margin-right: 10px;
`

const StyledAppBar = styled(AppBar)`
  pointer-events: none;
`

const TheHeader = () => (
  <StyledAppBar position="static">
    <Grid container>
      <Grid item lg={1} xl={2} />

      <Grid item xs={12} lg={10} xl={8}>
        <Toolbar>
          <BrandIcon />

          <Typography variant="h6" color="inherit" noWrap>
            Mask WJX
          </Typography>
        </Toolbar>
      </Grid>

      <Grid item lg={1} xl={2} />
    </Grid>
  </StyledAppBar>
)

export default TheHeader
