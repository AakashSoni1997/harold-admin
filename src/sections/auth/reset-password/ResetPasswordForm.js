import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// import logger from 'redux-logger';
import axios from 'axios';
import { baseUrlPostGres } from 'src/redux/constant';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { toast } from 'react-toastify';
import { LogoutAction } from 'src/redux/actions/AuthAction';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func,
};

export default function ResetPasswordForm({ onSent, onGetEmail }) {
  const dispatch=useDispatch()
  const isMounted = useRef(true);

  useEffect(
    () => () => {
      isMounted.current = false;
    }, []);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'demo@minimals.cc' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log("fhsdufsfs", data);
      let data1 = { email: data.email }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (isMounted.current) {
        axios
          .post(`${baseUrlPostGres()}/api/forgot-password`, JSON.stringify(data1), {
            headers: apiHeader(true)
          })
          .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
            onSent();
            onGetEmail(data.email);
          })
          .catch(errors => {
            toast.error(errors.data.message, { theme: "colored" })
          })

      }
    } catch (error) {
      console.error(error, "error");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email address" />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Reset Password
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
