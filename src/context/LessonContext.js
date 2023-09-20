import { createContext, useState } from 'react';
import axios from 'src/utils/axios';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [lesson, setLesson] = useState(null);

  const fetchLessonData = async (id) => {
    try {
      const response = await axios.get(`/api/get-lesson/${id}`);
      console.log('Received data:', response.data);
      setLesson(response.data);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
    }
  };

  return (
    <LessonContext.Provider value={{ lesson, fetchLessonData }}>{children}</LessonContext.Provider>
  );
};
