import React from 'react';
import FormError from './FormError';
import { InputAdornment, Grid, TextField } from '@mui/material';

const FormInput = ({
  className,
  register,
  label,
  icons,
  md,
  xs,
  name,
  type,
  placeholder,
  size,
  errors,
  errorMessage,
}) => {
  return (
    <>
      <Grid item md={md} xs={xs}>
        <TextField
          fullWidth
          placeholder={placeholder}
          type={type}
          label={label}
          {...register(name, { required: true, minLength: size })}
          variant='filled'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' className={className}>
                {icons}
              </InputAdornment>
            ),
          }}
        />
        <FormError
          errors={errors}
          errorMessage={errorMessage}
          classes={className}
        />
      </Grid>
    </>
  );
};

export default FormInput;