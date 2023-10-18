import { m } from 'framer-motion';
import { Button, Typography, TextField, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { useSnackbar } from 'src/components/snackbar';
import { EMAILJS_API } from 'src/config-global';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

export default function ContactForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { serviceId, templateId, userId } = EMAILJS_API;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const emailData = {
        to_name: 'Sparkaplan Admin', // Adjust this to the desired recipient name
        from_name: values.name,
        message: `
    Email: ${values.email}
    Subject: ${values.subject}
    Message: ${values.message}
    `,
      };

      emailjs.send(serviceId, templateId, emailData, userId).then(
        (response) => {
          enqueueSnackbar('Message sent successfully!', {
            variant: 'success',
          });
          resetForm({});
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
    },
  });

  return (
    <Stack component={m.div} spacing={5}>
      <Typography variant="h3">
        Feel free to contact us. <br />
        Let us know if you have any problems or any suggestions you may have!
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            label="Subject"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
          />

          <TextField
            fullWidth
            label="Enter your message here."
            name="message"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
          />
        </Stack>

        <Button
          type="submit"
          size="large"
          variant="contained"
          sx={{
            mt: 3,
          }}
        >
          Submit Now
        </Button>
      </form>
    </Stack>
  );
}
