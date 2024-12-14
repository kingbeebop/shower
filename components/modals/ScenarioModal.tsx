// /components/modals/ScenarioModal.tsx
'use client'

import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addScenario } from '../../redux/slices/scenarioSlice';
import { AppDispatch } from '../../redux/store';
import { Scenario } from '../../types/Scenario'

interface ScenarioModalProps {
  closeModal: () => void; // Close modal function passed as a prop
  setScenario: (scenario: Scenario) => void
}

const ScenarioModal = ({ closeModal, setScenario }: ScenarioModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    // Validate if both fields are filled
    if (!name || !description) {
      setError('Both fields are required');
      return;
    }

    // Create a new scenario object and dispatch to Redux
    const newScenario = { name, description };
    dispatch(addScenario(newScenario));  // Dispatch addScenario action
    setScenario(newScenario)
    // Close the modal after submitting
    closeModal();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setError('');
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Add New Scenario</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!error}
          helperText={error && 'Both fields are required'}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!error}
          helperText={error && 'Both fields are required'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">Close</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScenarioModal;
