import React from 'react';
import TextField from '@mui/material/TextField';
import type { FormikProps } from 'formik';

type LoginFormProps = {
  formik: FormikProps<any>;
};

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm: React.FC<LoginFormProps> = ({ formik }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <TextField
        fullWidth
        size="small"
        placeholder="Email"
        name="login"
        value={formik.values.login || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && typeof formik.errors.login === 'string' ? formik.errors.login : ''}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        size="small"
        placeholder="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formik.values.password || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && typeof formik.errors.password === 'string' ? formik.errors.password : ''}
        sx={{ mb: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default LoginForm;
