import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
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

  const handleAddSession = () => {
    if (newSessionContent.trim() && newSessionDate) {
      setSessions([
        ...sessions,
        { date: newSessionDate, content: newSessionContent },
      ]);
      setNewSessionContent('');
      setNewSessionDate('');
      alert('Session saved successfully!');
    } else {
      alert('Please fill both the session date and content.');
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

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAddSession}>
            Save Session
          </Button>
        </Box>
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
                <Typography variant="subtitle2">
                  Date: {session.date}
                </Typography>
                <Typography variant="body2">{session.content}</Typography>
              </Box>
            ))
        )}
      </Card>

      {/* Export to PDF */}
      <Button variant="outlined" color="secondary" onClick={handleExportPDF}>
        Export All Sessions as PDF
      </Button>
    </Box>
  );
};

export default Session;
