import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from '@mui/material';
import { jsPDF } from 'jspdf';

interface SessionNote {
  date: string;
  content: string;
}

const initialSessions: SessionNote[] = [
  {
    date: '2025-06-01',
    content: 'Discussed coping mechanisms for stress.',
  },
  {
    date: '2025-06-15',
    content: 'Follow-up on progress with substance avoidance.',
  },
];

const Session: React.FC = () => {
  const [sessions, setSessions] = useState<SessionNote[]>(initialSessions);
  const [newSessionContent, setNewSessionContent] = useState<string>('');
  const [newSessionDate, setNewSessionDate] = useState<string>('');
  const [rescheduleDate, setRescheduleDate] = useState<string>('');
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleAddSession = () => {
    if (newSessionContent.trim() && newSessionDate) {
      setSessions([
        ...sessions,
        { date: newSessionDate, content: newSessionContent },
      ]);
      setNewSessionContent('');
      setNewSessionDate('');
      showSnackbar('Session saved successfully!');
    } else {
      showSnackbar('Please fill both the session date and content.');
    }
  };

  const handleReschedule = () => {
    if (rescheduleDate) {
      const updatedSessions = [...sessions];
      updatedSessions[updatedSessions.length - 1].date = rescheduleDate;
      setSessions(updatedSessions);
      setIsRescheduling(false);
      setRescheduleDate('');
      showSnackbar('Session rescheduled successfully!');
    } else {
      showSnackbar('Please select a new date to reschedule.');
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Client Session Notes', 20, 20);

    let yPos = 30;
    sessions.forEach((session, index) => {
      doc.setFontSize(12);
      doc.text(
        `${index + 1}. Date: ${session.date}\nNotes: ${session.content}`,
        20,
        yPos
      );
      yPos += 20;
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
    });

    doc.save('Client_Sessions.pdf');
  };

  const handleApplyForRehab = () => {
    showSnackbar('Applied for Rehab successfully!');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Client Sessions
      </Typography>

      {/* Write New Session */}
      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Write New Session Note
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Session Date"
              type="date"
              value={newSessionDate}
              onChange={(e) => setNewSessionDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Session Content"
              multiline
              rows={4}
              value={newSessionContent}
              onChange={(e) => setNewSessionContent(e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddSession}>
            Save Session
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsRescheduling(!isRescheduling)}
          >
            Reschedule Last Session
          </Button>
        </Box>

        {isRescheduling && (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="New Session Date"
              type="date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleReschedule}
              >
                Confirm Reschedule
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsRescheduling(false);
                  setRescheduleDate('');
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Card>

      {/* Previous Sessions */}
      <Card sx={{ p: 3, mb: 4, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>
          Previous Sessions
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {sessions.length === 0 ? (
          <Typography>No sessions recorded yet.</Typography>
        ) : (
          sessions
            .slice()
            .reverse()
            .map((session, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: '#f9f9f9',
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle2">Date: {session.date}</Typography>
                <Typography variant="body2">{session.content}</Typography>
              </Box>
            ))
        )}
      </Card>

      {/* Export and Apply Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="outlined" color="secondary" onClick={handleExportPDF}>
          Export All Sessions as PDF
        </Button>
        <Button variant="contained" color="success" onClick={handleApplyForRehab}>
          Apply for Rehab
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Session;
