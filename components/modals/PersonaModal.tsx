// /components/modals/ModalPersona.tsx
'use client'

import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addPersona } from '../../redux/slices/personaSlice';
import { AppDispatch } from '../../redux/store';
import { Persona } from '../../types/Persona'

interface ModalPersonaProps {
  closeModal: () => void; // Close modal function passed as a prop
  setPersona: (persona: Persona) => void;
}

const PersonaModal = ({ closeModal, setPersona }: ModalPersonaProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {
    if (!name || !description) {
      setError('Both fields are required');
      return;
    }

    const newPersona = { name, description };
    dispatch(addPersona(newPersona));  // Dispatch addPersona action
    setPersona(newPersona)
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
      <DialogTitle>Add New Persona</DialogTitle>
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

export default PersonaModal
