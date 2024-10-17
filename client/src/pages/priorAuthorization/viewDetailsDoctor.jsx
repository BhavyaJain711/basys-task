import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authAxios from '../../authAxios';
import {
  Container,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PatientDetailsPage = () => {
  const { userId } = useParams(); // Extract userId from URL params
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient details when component mounts
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await authAxios.get(`/patients/${userId}`);
        setPatientData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching patient details.");
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <Container maxWidth="md" className="mt-12">
      <Typography variant="h4" component="h2" gutterBottom>
        {patientData.name}'s Details
      </Typography>

      <Grid container spacing={4} className="mt-4">
        {/* Basic Information */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Basic Information</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography><strong>Gender:</strong> {patientData.gender}</Typography>
              <Typography><strong>Age:</strong> {patientData.age}</Typography>
              <Typography><strong>Condition:</strong> {patientData.condition || "None"}</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Medical History */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Medical History</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {patientData.medicalHistory.length > 0 ? (
                patientData.medicalHistory.map((history) => (
                  <Accordion key={history._id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">{history.condition}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography><strong>Treatment:</strong> {history.treatment}</Typography>
                      <Typography><strong>Medications:</strong> {history.medications.join(', ') || "None"}</Typography>
                      <Typography><strong>Lab Results:</strong> {history.labResults.join(', ') || "None"}</Typography>
                      <Typography><strong>Notes:</strong> {history.notes || "None"}</Typography>
                      <Typography><strong>Date:</strong> {new Date(history.date).toLocaleDateString()}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography>No medical history available.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Prior Authorization Requests */}
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Prior Authorization Requests</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {patientData.priorAuthRequests.length > 0 ? (
                patientData.priorAuthRequests.map((auth) => (
                  <Accordion key={auth._id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="subtitle1">{auth.treatment}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography><strong>Insurance Plan:</strong> {auth.insurancePlan}</Typography>
                      <Typography><strong>Date of Service:</strong> {new Date(auth.dateOfService).toLocaleDateString()}</Typography>
                      <Typography><strong>Diagnosis Code:</strong> {auth.diagnosisCode}</Typography>
                      <Typography><strong>Doctor's Notes:</strong> {auth.doctorNotes || "None"}</Typography>
                      <Typography><strong>Status:</strong> {auth.status}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))
              ) : (
                <Typography>No prior authorization requests available.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDetailsPage;
