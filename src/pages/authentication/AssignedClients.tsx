import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  List,
  TextField,
  Typography,
} from '@mui/material';

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
    name: 'John',
    surname: 'Doe',
    age: 25,
    gender: 'Male',
    suburb: 'Hillbrow',
    nextOfKin: 'Jane Doe',
    nextOfKinPhone: '123-456-7890',
    substances: 'Alcohol, Marijuana',
  },
  {
    id: '2',
    fileNumber: 'FN002',
    idNumber: '8505057654321',
    name: 'Mary',
    surname: 'Smith',
    age: 30,
    gender: 'Female',
    suburb: 'Soweto',
    nextOfKin: 'Tom Smith',
    nextOfKinPhone: '987-654-3210',
    substances: 'Methamphetamine',
  },
];

const AssignedClients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setIsEditing(false);
  };

  const handleInputChange = (
    field: keyof Client,
    value: string | number
  ) => {
    if (selectedClient) {
      setSelectedClient({
        ...selectedClient,
        [field]: value,
      });
    }
  };

  const handleSave = () => {
    if (selectedClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === selectedClient.id ? selectedClient : client
        )
      );
      alert('Client details updated successfully!');
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
            <Typography variant="h6">{client.name} {client.surname}</Typography>
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

          {/* Substances */}
          <Typography variant="subtitle1" sx={{ mt: 4, mb: 1 }}>
            Substances Used
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TextField
            label="Substances"
            value={selectedClient.substances}
            onChange={(e) => handleInputChange('substances', e.target.value)}
            fullWidth
            multiline
            rows={3}
            {...getTextFieldProps()}
          />

          {/* Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            {!isEditing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
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
    </Box>
  );
};

export default AssignedClients;
