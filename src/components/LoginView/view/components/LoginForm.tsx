import React from 'react';
import TextField from '@mui/material/TextField';
import type { FormikProps } from 'formik';

type LoginFormProps = {
  formik: FormikProps<any>;
};

const LoginForm: React.FC<LoginFormProps> = ({ formik }) => (
  <TextField
    fullWidth
    size="small"
    placeholder="Username or Email"
    name="login"
    value={formik.values.login || ''}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.login && Boolean(formik.errors.login)}
    helperText={formik.touched.login && formik.errors.login}
    sx={{ mb: 1 }}
  />
);

export default LoginForm;
