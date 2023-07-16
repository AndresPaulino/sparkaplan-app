import { isBefore } from 'date-fns';
import merge from 'lodash/merge';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, Stack, TextField } from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
// components
// import { createLessonPlan } from 'src/pages/api/Lesson';
import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useSnackbar } from '../../../components/snackbar';
import { useDispatch } from '../../../redux/store';

const LessonForm = () => {
  return (
    <FormProvider>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Title" fullWidth />
        <RHFTextField
          name="learning_objective"
          label="Learning objective"
          fullWidth
          multiline
          rows={4}
        />
        <DragDropContext>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                {components.length > 0 &&
                  components.map((component, index) => (
                    <Draggable key={component.id} draggableId={component.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            marginBottom: 3,
                          }}
                        >
                          {component.content}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              label="Start date"
              inputFormat="MM/dd/yyyy hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />

        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue) => field.onChange(newValue)}
              label="End date"
              inputFormat="MM/dd/yyyy hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && 'End date must be later than start date'}
                />
              )}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {/* {hasEventData && (
          <Tooltip title="Delete Event">
            <IconButton onClick={onDeleteEvent}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        )} */}

        <Box sx={{ flexGrow: 1 }} />

        {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {hasEventData ? 'Save' : 'Generate'}
        </LoadingButton> */}
      </DialogActions>
    </FormProvider>
  );
};

export default LessonForm;
