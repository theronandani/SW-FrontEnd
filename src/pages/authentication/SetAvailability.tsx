import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Snackbar,
  TextField,
  Typography,
  Alert,
} from '@mui/material';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

interface DayAvailability {
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

const SetAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<DayAvailability[]>(
    daysOfWeek.map((day) => ({
      day,
      isAvailable: false,
      startTime: '',
      endTime: '',
    }))
  );

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCheckboxChange = (index: number) => {
    const updated = [...availability];
    updated[index].isAvailable = !updated[index].isAvailable;
    setAvailability(updated);
  };

  const handleTimeChange = (
    index: number,
    field: 'startTime' | 'endTime',
    value: string
  ) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleSubmit = () => {
    const selectedAvailability = availability.filter((day) => day.isAvailable);
    console.log('Submitted Availability:', selectedAvailability);

    // Simulate successful save
    setOpenSnackbar(true);

    // If posting to backend, place API call here
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Set Your Availability
      </Typography>

      {availability.map((day, index) => (
        <Box key={day.day} sx={{ mb: 2, borderBottom: '1px solid #ccc', pb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={day.isAvailable}
                onChange={() => handleCheckboxChange(index)}
              />
            }
            label={day.day}
          />

          {day.isAvailable && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="Start Time"
                  value={day.startTime}
                  onChange={(e) =>
                    handleTimeChange(index, 'startTime', e.target.value)
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="time"
                  label="End Time"
                  value={day.endTime}
                  onChange={(e) =>
                    handleTimeChange(index, 'endTime', e.target.value)
                  }
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Availability
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Availability saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SetAvailability;
