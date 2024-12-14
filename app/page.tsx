import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Shower Exposure
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Become who you want to be through simulated conversations
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Create Persona</Typography>
                <Typography variant="body2" color="text.secondary">
                  Define who you want to practice talking with
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Set Scenario</Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose the type of conversation to practice
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Practice</Typography>
                <Typography variant="body2" color="text.secondary">
                  Start your conversation simulation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button
          component={Link}
          href="/setup"
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Box>
    </Container>
  );
}
