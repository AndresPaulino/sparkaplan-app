// lessonPlan.js

import axios from 'axios';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Container, Box, Typography, List, ListItem, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { CalendarMonth } from '@mui/icons-material';

const LessonPlan = ({ id }) => {
  const [lessonPlan, setLessonPlan] = useState({});

  useEffect(() => {
    const fetchLessonPlan = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/lessons/${id}`);
        setLessonPlan(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLessonPlan();
  }, [id]);

  if (!lessonPlan.title) return 'Loading...';

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 3,
        py: 6,
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          {lessonPlan.title}
        </Typography>

        <Box display="flex" alignItems="center" mb={2}>
          <CalendarMonth sx={{ mr: 1 }} />
          <Typography>{format(new Date(lessonPlan.date), 'PP')}</Typography>
        </Box>

        <Typography variant="h6">Objective:</Typography>
        <Typography paragraph>{lessonPlan.objective}</Typography>

        <Typography variant="h6">Materials:</Typography>
        <List>
          {lessonPlan.materials.map((material, index) => (
            <ListItem key={index}> - {material}</ListItem>
          ))}
        </List>

        {lessonPlan.sections.map((section, index) => (
          <Box key={index} mb={4}>
            <Typography sx={{ mb: 1 }} variant="h5">
              {section.title}
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <AccessTimeIcon sx={{ mr: 1 }} />
              <Typography>{section.duration}</Typography>
            </Box>
            <Typography sx={{ mb: 1 }} variant="subtitle1">
              Description:
            </Typography>
            <Typography paragraph>{section.description}</Typography>
            <Typography sx={{ mb: 1 }} variant="subtitle1">
              Instructions:
            </Typography>
            <Typography paragraph>{section.instructions}</Typography>
            <Divider />
          </Box>
        ))}

        <Typography sx={{ mb: 1 }} variant="h6">
          Assessment:
        </Typography>
        <Typography paragraph>{lessonPlan.assessment}</Typography>

        <Typography sx={{ mb: 1 }} variant="h6">
          Conclusion:
        </Typography>
        <Typography paragraph>{lessonPlan.conclusion}</Typography>
      </Container>
    </Box>
  );
};

export default LessonPlan;
