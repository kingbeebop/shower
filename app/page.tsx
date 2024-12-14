"use client";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Icon,
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentStory } from "../redux/slices/storySlice";
import { useRouter } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GroupsIcon from '@mui/icons-material/Groups';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import StarIcon from '@mui/icons-material/Star';

export default function Home() {
  const { stories } = useSelector((state: RootState) => state.story);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleStorySelect = (story) => {
    dispatch(setCurrentStory(story));
    router.push("/conversation");
  };

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Shower Exposure
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Become who you want to be through simulated conversations
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
          Practice difficult conversations in a safe environment. Our AI-powered simulator helps you prepare for real-world scenarios with personalized feedback.
        </Typography>
      </Box>

      {/* Featured Scenarios */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Workplace Dynamics</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Master difficult conversations with your boss, colleagues, or clients.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Asking for a raise</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Project negotiations</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Personal Relationships</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Navigate sensitive conversations with partners, family, and friends.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Breaking up conversations</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Resolving conflicts</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'box-shadow 0.3s' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PsychologyIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Personal Growth</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph>
                Face your fears and overcome personal challenges.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Confronting phobias</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ArrowForwardIosIcon sx={{ fontSize: 14, color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2">Building confidence</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* How It Works */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'primary.light', 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <GroupsIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </Box>
              <Typography variant="h6" gutterBottom>1. Create Persona</Typography>
              <Typography variant="body2" color="text.secondary">
                Define who you want to practice talking with. Choose from common relationships or create custom personas.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'primary.light', 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <TrackChangesIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </Box>
              <Typography variant="h6" gutterBottom>2. Set Scenario</Typography>
              <Typography variant="body2" color="text.secondary">
                Choose the type of conversation to practice and set your goals for the interaction.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{ 
                bgcolor: 'primary.light', 
                width: 64, 
                height: 64, 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <StarIcon sx={{ fontSize: 32, color: 'primary.main' }} />
              </Box>
              <Typography variant="h6" gutterBottom>3. Practice</Typography>
              <Typography variant="body2" color="text.secondary">
                Engage in realistic dialogue with AI-powered personas and receive feedback on your approach.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Existing Stories */}
      {stories.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Your Scenarios
          </Typography>
          <Grid container spacing={3}>
            {stories.map((story, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardActionArea onClick={() => handleStorySelect(story)}>
                    <CardContent>
                      <Typography variant="h6">{story.persona.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {story.scenario.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Goal: {story.userGoals}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Floating CTA Button */}
      <Box sx={{ 
        position: 'fixed', 
        bottom: 32, 
        left: 0, 
        right: 0, 
        textAlign: 'center', 
        zIndex: 1000
      }}>
        <Button
          component={Link}
          href="/setup"
          variant="contained"
          size="large"
          sx={{ 
            px: 4, 
            py: 2,
            boxShadow: 3,
            '&:hover': { boxShadow: 6 }
          }}
        >
          {stories.length > 0 ? 'Make New Scenario' : 'Get Started'}
        </Button>
      </Box>

      {/* Bottom spacing to prevent content from being hidden behind floating button */}
      <Box sx={{ height: 96 }} />
    </Container>
  );
}