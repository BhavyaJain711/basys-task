import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container } from '@mui/material';
import authAxios from '../authAxios';
import { useParams, useLocation } from 'react-router-dom';

const MedicalHistoryForm = () => {
    const [condition, setCondition] = useState('');
    const [treatment, setTreatment] = useState('');
    const [medications, setMedications] = useState('');
    const [labResults, setLabResults] = useState('');
    const [notes, setNotes] = useState('');
    const patientId = useParams().id;
    const location = useLocation();
    const { name,age } = location.state;

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert medications and labResults to arrays
        const medicationsArray = medications.split(',').map(item => item.trim());
        const labResultsArray = labResults.split(',').map(item => item.trim());

        try {
            const response = await authAxios.post('/patients/medicalHistory', {
                patientId,
                condition,
                treatment,
                medications: medicationsArray,
                labResults: labResultsArray,
                notes,
            });

            if (response.data.message) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error adding medical history:', error);
            alert('Failed to add medical history');
        }
    };

    return (
        <Container>
        <Grid container  spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Add Medical History for {name}, {age}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Condition"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    fullWidth
                    required
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Medications (comma separated)"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Lab Results (comma separated)"
                    value={labResults}
                    onChange={(e) => setLabResults(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Add Medical History
                </Button>
            </Grid>
        </Grid>
        </Container>
    );
};

export default MedicalHistoryForm;
