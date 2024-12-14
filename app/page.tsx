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
} from "@mui/material";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrentStory } from "../redux/slices/storySlice";
import { useRouter } from "next/navigation";

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
      <Box sx={{ my: 4, textAlign: "center" }}>
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

        {stories.length > 0 ? (
          <>
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {stories.map((story, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => handleStorySelect(story)}>
                      <CardContent>
                        <Typography variant="h5">{story.persona.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {story.scenario.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 1 }}
                        >
                          Goal: {story.userGoals}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Button
              component={Link}
              href="/setup"
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
            >
              Make New Scenario
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mt: 4 }}>
              No stories found. Start by creating a persona and setting a
              scenario.
            </Typography>

            <Button
              component={Link}
              href="/setup"
              variant="contained"
              size="large"
              sx={{ mt: 4 }}
            >
              Get Started
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
