'use client'

import { useState } from 'react'
import { Box, Container, Typography, Stepper, Step, StepLabel, Card, CardContent, FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';
import Link from 'next/link';
import PersonaModal from '../../components/modals/PersonaModal'
import ScenarioModal from '@/components/modals/ScenarioModal';

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
              <Select label="Select Persona">
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
              <Select label="Select Scenario">
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
            component={Link}
            href="/conversation"
            variant="contained"
            color="primary"
          >
            Start Conversation
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 