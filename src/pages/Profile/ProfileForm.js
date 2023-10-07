import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';

// ----------------------------------------------------------------------

ProfileForm.propTypes = {
    currentUser: PropTypes.object,
};

export default function ProfileForm({ currentUser }) {
    const user=JSON.parse(localStorage.getItem("security_auth"));
    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email(),
        phoneNumber: Yup.string().required('Phone number is required'),
        avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    });
 
    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            avatarUrl: currentUser?.avatarUrl || '',
        }),
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (currentUser) {
            reset(defaultValues);
        }
    }, [currentUser]);

    const onSubmit = async () => {
        // try {
        //   await new Promise((resolve) => setTimeout(resolve, 500));
        //   reset();
        //   enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        //   navigate(PATH_DASHBOARD.user.list);
        // } catch (error) {
        //   console.error(error);
        // }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatarUrl',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12} md={6} lg={5}>
                    <Card sx={{ py: 5, px: 3 }}>
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="avatarUrl"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        Allowed *.jpeg, *.jpg, *.png, *.gif
                                        <br /> max size of {fData(3145728)}
                                    </Typography>
                                }
                            />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <RHFTextField name="name" label="Full Name" />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <RHFTextField name="email" label="Email Address" />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <RHFTextField name="phoneNumber" label="Phone Number" />
                        </Box>
                        <Stack sx={{ mt: 3 }}>
                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
