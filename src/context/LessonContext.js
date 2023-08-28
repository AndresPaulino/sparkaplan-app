import { createContext, useState } from 'react';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [lesson, setLesson] = useState(null);

  const fetchLessonData = async (id) => {
    try {
      // Your fetch logic here
      const response = await fetch(`http://127.0.0.1:5000/api/get-lesson/${id}`);
      const data = await response.json();
      setLesson(data);
    } catch (error) {
      console.error("Error fetching lesson data:", error);
    }
  };

  return (
    <LessonContext.Provider value={{ lesson, fetchLessonData }}>
      {children}
    </LessonContext.Provider>
  );
};
