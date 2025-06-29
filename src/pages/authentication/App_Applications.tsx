import React, { useState } from 'react';
import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

interface Application {
  clientName: string;
  fileNumber: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const initialApplications: Application[] = [
  {
    clientName: 'John Doe',
    fileNumber: 'FN001',
    status: 'Pending',
  },
  {
    clientName: 'Sarah Smith',
    fileNumber: 'FN002',
    status: 'Approved',
  },
  {
    clientName: 'Michael Johnson',
    fileNumber: 'FN003',
    status: 'Rejected',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success';
    case 'Pending':
      return 'warning';
    case 'Rejected':
      return 'error';
    default:
      return 'default';
  }
};

const App_Applications: React.FC = () => {
  const [applications] = useState<Application[]>(initialApplications);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rehab Applications
      </Typography>

      {applications.length === 0 ? (
        <Typography>No rehab applications found.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell><strong>Client Name</strong></TableCell>
                <TableCell><strong>File Number</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app, index) => (
                <TableRow key={index} hover>
                  <TableCell>{app.clientName}</TableCell>
                  <TableCell>{app.fileNumber}</TableCell>
                  <TableCell>
                    <Chip
                      label={app.status}
                      color={getStatusColor(app.status)}
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default App_Applications;
