import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, TextField, Grid, MenuItem, Select, InputLabel, FormControl, Slider, Typography, Container, IconButton, Menu, MenuItem as MenuListItem } from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material'; // For the 3 dots icon
import authAxios from '../../authAxios'
import { useNavigate } from 'react-router-dom';

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPatients, setTotalPatients] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState([0, 150]);
  const [debouncedAgeRange, setDebouncedAgeRange] = useState([0, 150]);
  const [anchorEl, setAnchorEl] = useState(null); // Menu anchor
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Selected patient for the menu
  const navigate = useNavigate();

  const openMenu = (event, patientId) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatientId(patientId);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedPatientId(null);
  };

  const handleNavigate = (path,patient) => {
    navigate(path,{state:{
      name:patient.name,
      id:patient._id,
      age:patient.age
    }});
    closeMenu();
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAgeRange(ageRange);
    }, 700);
    return () => {
      clearTimeout(handler);
    };
  }, [ageRange]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await authAxios.get('/patients/all', {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search: debouncedSearchTerm,
            gender: gender !== '' ? gender : undefined,
            minAge: debouncedAgeRange[0] !== 0 ? debouncedAgeRange[0] : undefined,
            maxAge: debouncedAgeRange[1] !== 150 ? debouncedAgeRange[1] : undefined,
          },
        });
        const { data, totalPatients } = response.data;
        setPatients(data);
        setTotalPatients(totalPatients);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, [page, rowsPerPage, debouncedSearchTerm, gender, debouncedAgeRange]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleAgeRangeChange = (event, newValue) => {
    setAgeRange(newValue);
  };

  return (
    <>
      {/* Search bar and filters */}
      <Grid padding={2} container gap={2} direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={4} md={2}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={gender}
              onChange={handleGenderChange}
              label="Gender"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={10} sm={6} md={3}>
          <Typography gutterBottom>Age Range</Typography>
          <Slider
            value={ageRange}
            onChange={handleAgeRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={150}
            marks={[
              { value: 0, label: '0' },
              { value: 150, label: '150+' },
            ]}
            aria-labelledby="age-range-slider"
          />
          <Typography textAlign={'center'}>Selected Age Range: {ageRange[0]} - {ageRange[1]}</Typography>
        </Grid>
      </Grid>

      {/* MUI Table */}
      <Container maxWidth={false}>
        <Table spacing={2} gap={2}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Actions</TableCell> {/* New Actions column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient._id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.condition}</TableCell>
                <TableCell>
                  {/* Three dots menu */}
                  <IconButton onClick={(event) => openMenu(event, patient._id)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedPatientId === patient._id}
                    onClose={closeMenu}
                  >
                    <MenuListItem onClick={() => handleNavigate(`/add-medical-history/${patient._id}`,patient)}>Add Medical History</MenuListItem>
                    <MenuListItem onClick={() => handleNavigate(`/view-medical-history/${patient._id}`,patient)}>View Medical History</MenuListItem>
                    <MenuListItem onClick={() => handleNavigate(`/assign-prior-authorization/${patient._id}`,patient)}>Prior Authorization</MenuListItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={totalPatients}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>
    </>
  );
};

export default PatientTable;
