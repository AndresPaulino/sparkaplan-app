import { useState } from 'react';
import * as Yup from 'yup';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Stack, Alert, IconButton, InputAdornment, Typography, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PATH_AUTH } from '../../routes/paths';
import { useAuthContext } from '../../auth/useAuthContext';
import Iconify from '../../components/iconify';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import LoginLayout from '../../layouts/login';
import AuthWithSocial from './AuthWithSocial';

export default function LoginAuth0() {
  const { login } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <LoginLayout>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'grey.100',
          borderRadius: '25px',
          p: 4,
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15)',
        }}
      >
        <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
          <Typography variant="h4">Sign in to Sparkplan</Typography>

          <Stack direction="row" spacing={0.5}>
            <Typography variant="body2">New user?</Typography>

            <Link component={NextLink} href={PATH_AUTH.register} variant="subtitle2">
              Create an account
            </Link>
          </Stack>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            <RHFTextField name="email" label="Email address" />
            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack alignItems="flex-end" sx={{ my: 2 }}>
            <Link
              component={NextLink}
              href={PATH_AUTH.resetPassword}
              variant="body2"
              color="inherit"
              underline="always"
            >
              Forgot password?
            </Link>
          </Stack>
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitSuccessful || isSubmitting}
            sx={{
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Login
          </LoadingButton>
        </FormProvider>
        <AuthWithSocial />
      </Box>
    </LoginLayout>
  );
}
