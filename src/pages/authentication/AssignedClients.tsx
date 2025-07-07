import React, { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Client {
  id: string;
  fileNumber: string;
  idNumber: string;
  name: string;
  surname: string;
  age: number;
  gender: string;
  suburb: string;
  nextOfKin: string;
  nextOfKinPhone: string;
  substances: string;
}

const initialClients: Client[] = [
  {
    id: '1',
    fileNumber: 'FN001',
    idNumber: '9001011234567',
    name: 'Andani',
    surname: 'Theron',
    age: 25,
    gender: 'Male',
    suburb: 'Orlando east',
    nextOfKin: 'Tshivhenga Mulaudzi',
    nextOfKinPhone: '082-456-7890',
    substances: 'Alcohol, Marijuana',
  },
  {
    id: '2',
    fileNumber: 'FN002',
    idNumber: '8505057654321',
    name: 'Zach',
    surname: 'Mzi',
    age: 30,
    gender: 'Male',
    suburb: 'Chiawela',
    nextOfKin: 'Sizwe Mageba',
    nextOfKinPhone: '061-654-3210',
    substances: 'Methamphetamine',
  },
];

const AssignedClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false);
    setPdfFiles([]);
  };

  const handleInputChange = (field: keyof Client, value: string | number) => {
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        [field]: value,
      });
    }
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files).filter(
        (file) => file.type === 'application/pdf'
      );
      if (selectedFiles.length > 0) {
        setPdfFiles(selectedFiles);
      } else {
        alert('Please select valid PDF files only.');
      }
    }
  };

  const handleOpenSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSave = () => {
    if (selectedClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClient.id ? selectedClient : client
        )
      );
      handleOpenSnackbar('Client details updated successfully!');
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    const originalClient = clients.find(
      (client) => client.id === selectedClient?.id
    );
    if (originalClient) {
      setSelectedClient(originalClient);
    }
    setIsEditing(false);
    setPdfFiles([]);
  };

  const handleApplyForRehab = () => {
    if (pdfFiles.length > 0) {
      console.log('Applying for rehab for:', selectedClient?.name);
      pdfFiles.forEach((file) => {
        console.log('Uploading file:', file.name);
      });
      handleOpenSnackbar(
        `Rehab application submitted with ${pdfFiles.length} document(s).`
      );
      setPdfFiles([]);
    } else {
      alert('Please upload at least one PDF document before applying.');
    }
  };

  const getTextFieldProps = () => {
    return isEditing
      ? {}
      : { inputProps: { readOnly: true }, sx: { backgroundColor: '#f9f9f9' } };
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Assigned Clients
      </Typography>

      <List sx={{ display: 'grid', gap: 2, mb: 4 }}>
        {clients.map((client) => (
          <Card
            key={client.id}
            onClick={() => handleSelectClient(client)}
            sx={{
              p: 2,
              boxShadow: 3,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            <Typography variant="h6">
              {client.name} {client.surname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              File Number: {client.fileNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Suburb: {client.suburb}
            </Typography>
          </Card>
        ))}
      </List>

      {selectedClient && (
        <Card sx={{ p: 3, boxShadow: 4 }}>
          <Typography variant="h5" gutterBottom>
            Client Details
          </Typography>

          {/* Personal Details */}
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Personal Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="File Number"
                value={selectedClient.fileNumber}
                onChange={(e) =>
                  handleInputChange('fileNumber', e.target.value)
                }
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ID Number"
                value={selectedClient.idNumber}
                onChange={(e) =>
                  handleInputChange('idNumber', e.target.value)
                }
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={selectedClient.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Surname"
                value={selectedClient.surname}
                onChange={(e) => handleInputChange('surname', e.target.value)}
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Age"
                type="number"
                value={selectedClient.age}
                onChange={(e) =>
                  handleInputChange('age', Number(e.target.value))
                }
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Gender"
                value={selectedClient.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Suburb"
                value={selectedClient.suburb}
                onChange={(e) => handleInputChange('suburb', e.target.value)}
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
          </Grid>

          {/* Next of Kin */}
          <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
            Next of Kin
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Next of Kin Name"
                value={selectedClient.nextOfKin}
                onChange={(e) => handleInputChange('nextOfKin', e.target.value)}
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Next of Kin Phone"
                value={selectedClient.nextOfKinPhone}
                onChange={(e) =>
                  handleInputChange('nextOfKinPhone', e.target.value)
                }
                fullWidth
                {...getTextFieldProps()}
              />
            </Grid>
          </Grid>

          {/* Substances and PDF Upload */}
          <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
            Substances Used
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Substances"
                value={selectedClient.substances}
                onChange={(e) =>
                  handleInputChange('substances', e.target.value)
                }
                fullWidth
                multiline
                rows={3}
                {...getTextFieldProps()}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Upload Rehab Documents (PDFs)
              </Typography>
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFilesChange}
              />
              {pdfFiles.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  {pdfFiles.map((file, index) => (
                    <Typography key={index} variant="body2" color="success.main">
                      {file.name}
                    </Typography>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() =>
                    navigate('/session', { state: { client: selectedClient } })
                  }
                >
                  Session
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleApplyForRehab}
                >
                  Apply for Rehab
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancelEdit}
                >
                  Cancel Edit
                </Button>
              </>
            )}
          </Box>
        </Card>
      )}

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

export default AssignedClients;
