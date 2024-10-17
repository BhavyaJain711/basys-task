import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authAxios from '../../authAxios';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

const AssignAuthorizationForm = () => {
    const { id } = useParams(); // Extract patient ID from route parameters
    const location = useLocation();
    const { name, age } = location.state; // Extract patient name and age from location state

    // Formik validation schema
    const validationSchema = Yup.object({
        treatment: Yup.string().required('Treatment is required'),
        insurancePlan: Yup.string().required('Insurance plan is required'),
        dateOfService: Yup.date().required('Date of service is required'),
        diagnosisCode: Yup.string().required('Diagnosis code is required'),
        doctorNotes: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            treatment: '',
            insurancePlan: '',
            dateOfService: '',
            diagnosisCode: '',
            doctorNotes: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Send the form data to the backend
                await authAxios.post(`/patients/authorization/${id}`, {
                    ...values,
                    patientId:id, // Include patientId in the request
                });
                alert('Authorization form submitted successfully');
            } catch (error) {
                console.error('Error submitting authorization form:', error);
                alert('Failed to submit authorization form');
            }
        },
    });

    return (
        <Container className='pt-12'>
            <Typography  variant="h4" gutterBottom>
                Prior Authorization Form for {name}, {age}
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <Grid alignItems={'center'} direction={'row'} justifyContent={'center'} container spacing={4}>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            id="treatment"
                            name="treatment"
                            label="Treatment"
                            value={formik.values.treatment}
                            onChange={formik.handleChange}
                            error={formik.touched.treatment && Boolean(formik.errors.treatment)}
                            helperText={formik.touched.treatment && formik.errors.treatment}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="insurancePlan"
                            name="insurancePlan"
                            label="Insurance Plan"
                            value={formik.values.insurancePlan}
                            onChange={formik.handleChange}
                            error={formik.touched.insurancePlan && Boolean(formik.errors.insurancePlan)}
                            helperText={formik.touched.insurancePlan && formik.errors.insurancePlan}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="dateOfService"
                            name="dateOfService"
                            label="Date of Service"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={formik.values.dateOfService}
                            onChange={formik.handleChange}
                            error={formik.touched.dateOfService && Boolean(formik.errors.dateOfService)}
                            helperText={formik.touched.dateOfService && formik.errors.dateOfService}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="diagnosisCode"
                            name="diagnosisCode"
                            label="Diagnosis Code"
                            value={formik.values.diagnosisCode}
                            onChange={formik.handleChange}
                            error={formik.touched.diagnosisCode && Boolean(formik.errors.diagnosisCode)}
                            helperText={formik.touched.diagnosisCode && formik.errors.diagnosisCode}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            multiline
                            maxRows={8}
                            id="doctorNotes"
                            name="doctorNotes"
                            label="Doctor Notes (Optional)"
                            value={formik.values.doctorNotes}
                            onChange={formik.handleChange}
                            error={formik.touched.doctorNotes && Boolean(formik.errors.doctorNotes)}
                            helperText={formik.touched.doctorNotes && formik.errors.doctorNotes}
                        />
                    </Grid>
                    <Grid item xs={12} md={12} container gap={2} justifyContent="center">
                        <Grid item>
                            <Button color="primary" variant="contained" type="submit">
                                Submit Authorization
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default AssignAuthorizationForm;
