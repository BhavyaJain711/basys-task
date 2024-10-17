import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import authAxios from '../authAxios';
import { Container, Typography, Card, CardContent, Grid, CircularProgress } from '@mui/material';

const ViewMedicalHistory = () => {
  const id = useParams().id; // Access patientId from route params
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { name, age } = state;

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await authAxios.get(`/patients/medical-history/${id}`);
        setMedicalHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching medical history:', error);
        setLoading(false);
      }
    };

    fetchMedicalHistory();
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Medical History for {name}, {age}
      </Typography>

      {medicalHistory.length === 0 ? (
        <Typography variant="body1">No medical history available for this patient.</Typography>
      ) : (
        <Grid container spacing={2}>
          {medicalHistory.map((history, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{new Date(history.date).toLocaleString('in-en')}</Typography>
                  <Typography variant="body2"><strong>Notes: </strong>{history.notes}</Typography>
                  {history.condition && (
                    <Typography variant="body2">
                      <strong>Condition:</strong> {history.condition}
                    </Typography>
                  )}
                    {history.treatment && (
                        <Typography variant="body2">
                        <strong>Treatment:</strong> {history.treatment}
                        </Typography>
                    )}
                    {history.medications && (
                        <Typography variant="body2">
                        <strong>Medications:</strong> {history.medications.join(', ')}
                        </Typography>
                    )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ViewMedicalHistory;
