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
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentStory } from "../redux/slices/storySlice";
import { useRouter } from "next/navigation";
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';

const GradientBox = ({ children, ...props }) => (
  <Box
    sx={{
      background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
      borderRadius: 2,
      p: 2,
      color: 'white',
      ...props.sx
    }}
    {...props}
  >
    {children}
  </Box>
);

export default function Home() {
  const { stories } = useSelector((state: RootState) => state.story);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const handleStorySelect = (story) => {
    dispatch(setCurrentStory(story));
    router.push("/conversation");
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)',
      pt: 4
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ 
          my: 6, 
          textAlign: "center",
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: -40,
            right: -100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)',
            zIndex: -1,
            borderRadius: '50%'
          }
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Shower Exposure
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Become who you want to be through simulated conversations
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              maxWidth: 600, 
              mx: "auto", 
              mb: 6,
              color: 'text.secondary',
              lineHeight: 1.8
            }}
          >
            Practice difficult conversations in a safe environment. Our AI-powered simulator
            helps you prepare for real-world scenarios with personalized feedback.
          </Typography>
        </Box>

        {/* Featured Scenarios */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              icon: <BusinessIcon />,
              title: "Workplace Dynamics",
              description: "Master difficult conversations with your boss, colleagues, or clients.",
              items: ["Asking for a raise", "Project negotiations"]
            },
            {
              icon: <GroupsIcon />,
              title: "Personal Relationships",
              description: "Navigate sensitive conversations with partners, family, and friends.",
              items: ["Breaking up conversations", "Resolving conflicts"]
            },
            {
              icon: <PsychologyIcon />,
              title: "Personal Growth",
              description: "Face your fears and overcome personal challenges.",
              items: ["Confronting phobias", "Building confidence"]
            }
          ].map((category, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  },
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  overflow: 'hidden'
                }}
              >
                <CardContent>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mb: 2,
                    p: 1,
                    borderRadius: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    color: 'white'
                  }}>
                    {category.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>{category.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {category.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {category.items.map((item, idx) => (
                      <Box 
                        key={idx} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          p: 1,
                          borderRadius: 1,
                          '&:hover': {
                            bgcolor: 'action.hover'
                          }
                        }}
                      >
                        <ChevronRightIcon sx={{ fontSize: 18, color: 'primary.main', mr: 1 }} />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* How It Works */}
        <Box sx={{ mb: 8, position: 'relative' }}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                borderRadius: 2,
                bgcolor: 'primary.main'
              }
            }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {[
              {
                icon: <EmojiPeopleIcon />,
                title: "1. Create Persona",
                description: "Define who you want to practice talking with. Choose from common relationships or create custom personas."
              },
              {
                icon: <SettingsIcon />,
                title: "2. Set Scenario",
                description: "Choose the type of conversation to practice and set your goals for the interaction."
              },
              {
                icon: <StarIcon />,
                title: "3. Practice",
                description: "Engage in realistic dialogue with AI-powered personas and receive feedback on your approach."
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Box sx={{ 
                  textAlign: 'center',
                  position: 'relative',
                  '&::after': index !== 2 ? {
                    content: '""',
                    position: 'absolute',
                    top: '30%',
                    right: '-10%',
                    width: '20%',
                    height: 2,
                    bgcolor: 'divider',
                    display: { xs: 'none', md: 'block' }
                  } : {}
                }}>
                  <Box sx={{ 
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    boxShadow: 4,
                    color: 'white'
                  }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Your Scenarios */}
        {stories.length > 0 && (
          <Box sx={{ mb: 8 }}>
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Your Scenarios
            </Typography>
            <Grid container spacing={3}>
              {stories.map((story, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    sx={{ 
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8]
                      },
                      borderRadius: 2
                    }}
                  >
                    <CardActionArea onClick={() => handleStorySelect(story)}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {story.persona.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {story.scenario.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mt: 2,
                            p: 1,
                            borderRadius: 1,
                            bgcolor: 'action.hover'
                          }}
                        >
                          Goal: {story.scenario.context.slice(0, 100)}...
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
              px: 6,
              py: 2,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
              boxShadow: theme.shadows[4],
              '&:hover': {
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                boxShadow: theme.shadows[8],
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {stories.length > 0 ? 'Make New Scenario' : 'Get Started'}
          </Button>
        </Box>

        {/* Bottom spacing */}
        <Box sx={{ height: 96 }} />
      </Container>
    </Box>
  );
}