
import { Box, Container, Typography, Stepper, Step, StepLabel, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setConversationSetup } from '../../redux/slices/conversationSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../../redux/store'
import { RootState } from '../../redux/store';

const personas = [
  'Boss',
  'Ex partner',
  'Current partner',
  'Parent',
  'Sibling',
  'Friend',
  'Colleague',
  'Customer'
];

const scenarios = [
  'Negotiating for a raise',
  'Making an investment',
  'Resolving an argument',
  'Discussing a political topic'
];

export default function Setup() {


   // State variables to manage modal visibility
   const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
   const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);
 
   // Handle opening and closing of Persona Modal
   const handleOpenPersona = () => setIsPersonaModalOpen(true);
   const handleClosePersona = () => setIsPersonaModalOpen(false);
 
   // Handle opening and closing of Scenario Modal
   const handleOpenScenario = () => setIsScenarioModalOpen(true);
   const handleCloseScenario = () => setIsScenarioModalOpen(false);

  const dispatch = useDispatch() as AppDispatch
  const router = useRouter();
  const personas  = useSelector((state: RootState) => state.persona.personas )

  const [formState, setFormState] = useState({
    persona: '',
    scenario: '',
    goal: ''
  });

  const handleChange = (field: string) => (event: any) => {
    setFormState(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    dispatch(setConversationSetup({
      persona: formState.persona,
      scenario: formState.scenario,
      goal: formState.goal
    }));
    router.push('/conversation');
  };

  const isFormValid = formState.persona && formState.scenario && formState.goal;


  return (
    <Container maxWidth="md">
      <PersonaModal closeModal={handleClosePersona}></PersonaModal>
      <ScenarioModal closeModal={handleCloseScenario}></ScenarioModal>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Setup Your Conversation
        </Typography>

        <Stepper activeStep={0} sx={{ mb: 4 }}>
          <Step>
            <StepLabel>Choose Persona</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Scenario</StepLabel>
          </Step>
          <Step>
            <StepLabel>Set Goals</StepLabel>
          </Step>
        </Stepper>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Who do you want to simulate a conversation with?
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Persona</InputLabel>
              <Select
                value={formState.persona}
                onChange={handleChange('persona')}
                label="Select Persona"
              >
                <MenuItem
                  onClick={() => setNewPersonaModal(true)}
                >
                  + New Persona
                </MenuItem>
                {personas.map((persona) => (
                  <MenuItem key={persona} value={persona}>
                    {persona}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              What type of conversation do you want to practice?
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Select Scenario</InputLabel>
              <Select
                value={formState.scenario}
                onChange={handleChange('scenario')}
                label="Select Scenario"
              >
                <MenuItem onClick={() => setNewScenarioModal(true)}>
                  + New Menu Item
                </MenuItem>
                {scenarios.map((scenario) => (
                  <MenuItem key={scenario} value={scenario}>
                    {scenario}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="h6" gutterBottom>
              What is your end goal?
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={formState.goal}
              onChange={handleChange('goal')}
              placeholder="Describe what you want to achieve from this conversation..."
              sx={{ mb: 3 }}
            />
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button component={Link} href="/" variant="outlined">
            Back
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={!isFormValid}
          >
            Start Conversation
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 