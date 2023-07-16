import React, { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

const gradeLevels = [
  'Pre-K',
  'Kindergarten',
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
];

const LessonForm = () => {
  const [lessonDetails, setLessonDetails] = useState({
    grade: '',
    lessonTitle: '',
    learningObjective: '',
  });

  const MenuProps = {
    PaperProps: {
      style: {
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    setLessonDetails({
      ...lessonDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(lessonDetails); // here you can send this data to the API
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          label="Grade Level"
          id="grade-level-select"
          value={lessonDetails.grade}
          name="grade"
          onChange={handleChange}
        >
          <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem>
          {gradeLevels.map((gradeLevel, index) => (
            <MenuItem key={index} value={gradeLevel}>
              {gradeLevel}
            </MenuItem>
          ))}
        </Select>
        <TextField
          name="lessonTitle"
          label="Lesson Title"
          value={lessonDetails.lessonTitle}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="learningObjective"
          label="Learning objective"
          value={lessonDetails.learningObjective}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <LoadingButton type="submit" variant="contained" sx={{ maxWidth: '10rem' }}>
          Generate Lesson
        </LoadingButton>
      </FormControl>
    </Box>
  );
};

export default LessonForm;
