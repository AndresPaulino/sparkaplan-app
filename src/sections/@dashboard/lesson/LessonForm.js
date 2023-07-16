import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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

const validationSchema = Yup.object().shape({
  grade: Yup.string().required('Grade level must be selected'),
  lessonTitle: Yup.string()
    .min(5, 'Lesson title must be at least 5 characters long')
    .required('Lesson title is required'),
  learningObjective: Yup.string()
    .min(10, 'Learning objective must be at least 10 characters long')
    .required('Learning objective cannot be empty'),
});

const LessonForm = () => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const formik = useFormik({
    initialValues: {
      grade: '',
      lessonTitle: '',
      learningObjective: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values); // here you can send this data to the API
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FormControl fullWidth error={formik.touched.grade && Boolean(formik.errors.grade)}>
        <InputLabel id="grade-level-select">Grade</InputLabel>
        <Select
          label="Grade Level"
          id="grade-level-select"
          value={formik.values.grade}
          name="grade"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          MenuProps={MenuProps}
        >
          {gradeLevels.map((gradeLevel, index) => (
            <MenuItem key={index} value={gradeLevel}>
              {gradeLevel}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.grade && formik.errors.grade ? (
          <FormHelperText>{formik.errors.grade}</FormHelperText>
        ) : null}
      </FormControl>
      <TextField
        name="lessonTitle"
        label="Lesson Title"
        value={formik.values.lessonTitle}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        error={formik.touched.lessonTitle && Boolean(formik.errors.lessonTitle)}
        helperText={formik.touched.lessonTitle && formik.errors.lessonTitle}
        sx={{ mt: 3 }}
      />
      <TextField
        name="learningObjective"
        label="Learning objective"
        value={formik.values.learningObjective}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        multiline
        rows={4}
        error={formik.touched.learningObjective && Boolean(formik.errors.learningObjective)}
        helperText={formik.touched.learningObjective && formik.errors.learningObjective}
        sx={{ mt: 3 }}
      />
      <LoadingButton type="submit" variant="contained" sx={{ maxWidth: '10rem', mt: 3 }}>
        Generate Lesson
      </LoadingButton>
    </Box>
  );
};

export default LessonForm;
