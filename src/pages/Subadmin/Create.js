import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
    Grid, Card, Table, Stack, Avatar, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination, Modal, Box, TextField,
} from '@mui/material';

// utils
import { fData } from '../../utils/formatNumber';
import { FormProvider, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
// ----------------------------------------------------------------------

export default function SubAdminCreate() {
    const navigate = useNavigate();
    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email(),
        phoneNumber: Yup.string().required('Phone number is required'),
        avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    });

    // const defaultValues = useMemo(
    //     () => ({
    //         name: currentUser?.name || '',
    //         email: currentUser?.email || '',
    //         phoneNumber: currentUser?.phoneNumber || '',
    //         avatarUrl: currentUser?.avatarUrl || '',
    //     }),
    //     [currentUser]
    // );

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        // defaultValues,
    });

    const {
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    // useEffect(() => {
    //     if (currentUser) {
    //         reset(defaultValues);
    //     }
    // }, [currentUser]);

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

    return (
        <Page title="User">
            <Container maxWidth="lg">
                <HeaderBreadcrumbs
                    heading="Sub Admin List"
                    links={[
                        { name: 'Dashboard', href: "/dashboard/app" },
                        { name: 'Sub Admin' }
                    ]}
                />

                <Card sx={{ py: 5, px: 3 }}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container
                        >
                            <Grid item
                                lg={12}
                                sx={{
                                    display: 'grid',
                                    columnGap: 3,
                                    rowGap: 3,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                }}

                            >
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="fname" label="First Name" />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="lname" label="Last Name" />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="email" label="Email Address" />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="phoneNumber" label="Phone Number" />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="password" label="Password" />
                                </Box>
                                <Box sx={{ mb: 2 }}>
                                    <RHFTextField name="dob" label="Date of birth" />
                                </Box>
                            </Grid>
                            <Stack sx={{ mt: 3 }}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Save Changes
                                </LoadingButton>
                            </Stack>
                        </Grid>
                    </FormProvider>
                </Card>
            </Container>
        </Page>
    );
}
