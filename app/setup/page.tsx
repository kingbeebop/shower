"use client";

import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setConversationSetup } from '../../redux/slices/conversationSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/store';
import { Persona } from '../../types/Persona';
import { Scenario } from '../../types/Scenario';
import PersonaModal from '@/components/modals/PersonaModal';
import ScenarioModal from '@/components/modals/ScenarioModal';

export default function Setup() {
  // State variables to manage modal visibility
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isScenarioModalOpen, setIsScenarioModalOpen] = useState(false);

  // State variables for form fields
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [goal, setGoal] = useState<string>('');

  // Handle opening and closing of Persona Modal
  const handleOpenPersona = () => setIsPersonaModalOpen(true);
  const handleClosePersona = () => setIsPersonaModalOpen(false);

  // Handle opening and closing of Scenario Modal
  const handleOpenScenario = () => setIsScenarioModalOpen(true);
  const handleCloseScenario = () => setIsScenarioModalOpen(false);

  const dispatch = useDispatch() as AppDispatch;
  const router = useRouter();
  const personasList = useSelector((state: RootState) => state.persona.personas);
  const scenariosList = useSelector((state: RootState) => state.scenario.scenarios);

  // Handle form field changes for goal
  const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };

  // Set Persona from modal
  const setPersona = (persona: Persona) => {
    setSelectedPersona(persona);
    handleClosePersona(); // Close the modal after selection
  };

  // Set Scenario from modal
  const setScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    handleCloseScenario(); // Close the modal after selection
  };

  // Handle form submission
  const handleSubmit = () => {
    if (selectedPersona && selectedScenario && goal.trim()) {
      dispatch(setConversationSetup({
        persona: selectedPersona,
        scenario: selectedScenario,
        goal
      }));
      router.push('/conversation');
    }
  };

  // Validation to check if the form is filled correctly
  const isFormValid = selectedPersona && selectedScenario && goal.trim() !== '';

  return (
    <Container maxWidth="md">
      {isPersonaModalOpen && <PersonaModal closeModal={handleClosePersona} setPersona={setPersona} />}
      {isScenarioModalOpen && <ScenarioModal closeModal={handleCloseScenario} setScenario={setScenario} />}
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
                value={selectedPersona ? selectedPersona.name : ''}
                onChange={(e) => setSelectedPersona(personasList.find(p => p.name === e.target.value) || null)}
                label="Select Persona"
              >
                <MenuItem onClick={handleOpenPersona}>
                  + New Persona
                </MenuItem>
                {personasList.map((persona) => (
                  <MenuItem key={persona.name} value={persona.name}>
                    {persona.name}
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
                value={selectedScenario ? selectedScenario.name : ''}
                onChange={(e) => setSelectedScenario(scenariosList.find(s => s.name === e.target.value) || null)}
                label="Select Scenario"
              >
                <MenuItem onClick={handleOpenScenario}>
                  + New Scenario
                </MenuItem>
                {scenariosList.map((scenario) => (
                  <MenuItem key={scenario.name} value={scenario.name}>
                    {scenario.name}
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
              value={goal}
              onChange={handleGoalChange}
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
