import React from 'react';
import TextField from '@mui/material/TextField';
import type { FormikProps } from 'formik';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { a11y } from '../../../../utils/accessibility';

const LoginForm: React.FC<{ formik: FormikProps<any> }> = ({ formik }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  
  return (
    <>
      <TextField
        fullWidth
        size="small"
        placeholder="Email"
        name="login"
        type="email"
        value={formik.values.login || ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.login && Boolean(formik.errors.login)}
        helperText={formik.touched.login && typeof formik.errors.login === 'string' ? formik.errors.login : ''}
        sx={{ mb: { xs: 1.5, sm: 2 } }}
        inputProps={{ 
          'aria-label': 'Email address',
          'aria-required': 'true',
          autoComplete: 'email'
        }}
        required
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
        sx={{ mb: { xs: 1.5, sm: 2 } }}
        inputProps={{
          'aria-label': 'Password',
          'aria-required': 'true',
          autoComplete: 'current-password'
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((show) => !show)}
                edge="end"
                size="small"
                sx={{
                  '&:focus': {
                    ...a11y.focusRing,
                  },
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
      />
    </>
  );
};

export default LoginForm;
