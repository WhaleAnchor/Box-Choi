import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material';

export default function NavBar() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar >
          <Container>
            <Typography variant="h3" sx={{ flexGrow: 1, alignSelf: "center" }}>
              EXPENSE TRACKER
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
              </Typography>
              <Button variant="text" color="secondary">
                Logout
              </Button>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}