import React, { useState } from 'react';
import { Box, FormControl, MenuItem, Select, styled, FormHelperText } from '@mui/material';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

const StyledDatePicker:any = styled(Select)(()=>({
    '.MuiSelect-select':{
        color: 'white !important',
        border: '1px solid white'
      },
      
    '.MuiSelect-icon':{
        marginBottom:'0 !important',
        color: 'white !important',
    }
}))

const DobSelector = ({formData, updateDob}) => {
  const [errors, setErrors] = useState({ month: '', day: '', year: '' });

  const handleDobChange = (e) => {
    let { name, value } = e.target;

    if (name === 'month') value = months.indexOf(value) + 1;

    updateDob({ [name]: value });

    // Validation
    let error = '';
    if (!value) {
      error = `${name} is required`;
    }
    setErrors({ ...errors, [name]: error });
  };

  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }} error={!!errors.month}>
        <StyledDatePicker
          value={months[formData?.dob?.month-1] || ''}
          placeholder="Month"
          name="month"
          displayEmpty
          renderValue={(current) => current || 'Month'}
          onChange={handleDobChange}
        >
          <MenuItem value="" disabled>
            Month
          </MenuItem>
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>
              {month}
            </MenuItem>
          ))}
        </StyledDatePicker>
        {errors.month && <FormHelperText>{errors.month}</FormHelperText>}
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120, mr: 2 }} error={!!errors.day}>
        <StyledDatePicker
          value={formData?.dob?.day || ''}
          placeholder="Day"
          name="day"
          displayEmpty
          renderValue={(current) =>  current || 'Day'}
          onChange={handleDobChange}
        >
          <MenuItem value="" disabled>
            Day
          </MenuItem>
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </StyledDatePicker>
        {errors.day && <FormHelperText>{errors.day}</FormHelperText>}
      </FormControl>
      <FormControl variant="outlined" sx={{ minWidth: 120 }} error={!!errors.year}>
        <StyledDatePicker
          value={formData?.dob?.year || ''}
          placeholder="Year"
          name="year"
          displayEmpty
          renderValue={(current) => current || 'Year'}
          onChange={handleDobChange}
        >
          <MenuItem value="" disabled>
            Year
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </StyledDatePicker>
        {errors.year && <FormHelperText>{errors.year}</FormHelperText>}
      </FormControl>
    </Box>
  );
};

export default DobSelector;