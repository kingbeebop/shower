import { Box, Container, Typography, Paper, TextField, Button, Avatar, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function Conversation() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h1">
            Conversation with Boss
          </Typography>
          <Chip
            label="Negotiating for a raise"
            color="primary"
            variant="outlined"
          />
        </Box>

        <Paper 
          sx={{ 
            flex: 1, 
            mb: 2, 
            p: 2, 
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {/* Example messages */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Avatar>B</Avatar>
            <Paper sx={{ p: 2, bgcolor: 'grey.100', maxWidth: '80%' }}>
              <Typography>
                Hello, what can I help you with today?
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, alignSelf: 'flex-end' }}>
            <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white', maxWidth: '80%' }}>
              <Typography>
                I'd like to discuss my compensation and career growth opportunities.
              </Typography>
            </Paper>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type your message..."
            variant="outlined"
            multiline
            maxRows={4}
          />
          <Button 
            variant="contained" 
            sx={{ minWidth: 'auto', px: 3 }}
          >
            <SendIcon />
          </Button>
        </Box>
      </Box>
    </Container>
  );
} 