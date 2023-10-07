import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// components
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// assets
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    return (
        <Page title="Reset Password" className="auth-body">
            <RootStyle>
                <Container>
                    <ContentStyle>
                        {!sent ? (
                            <>
                                <div className='text-center mb-3'>
                                    <img src="/static/aha-logo.png" width={300} alt="Credexon Sports" />
                                </div>
                                <div className='auth-container'>
                                    <Typography variant="h4" paragraph>
                                        Forgot your password?
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                                        Please enter the email address associated with your account and We will email you a link to reset your
                                        password.
                                    </Typography>

                                    <ResetPasswordForm onSent={() => setSent(true)} onGetEmail={(value) => setEmail(value)} />

                                    <Button fullWidth size="large" component={RouterLink} to="/login" sx={{ mt: 1 }}>
                                        Back
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <div className='text-center'>
                                <div className='text-center mb-3'>
                                    <img src="/static/aha-logo.png" width={300} alt="Credexon Sports" />
                                </div>
                                <div className='auth-container'>
                                    <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

                                    <Typography variant="h3" gutterBottom>
                                        Request sent successfully
                                    </Typography>
                                    <Typography>
                                        We have sent a confirmation email to &nbsp;
                                        <strong>{email}</strong>
                                        <br />
                                        Please check your email.
                                    </Typography>

                                    <Button fullWidth size="large" variant="contained" component={RouterLink} to="/login" sx={{ mt: 5 }}>
                                        Back
                                    </Button>
                                </div>
                            </div>
                        )}
                    </ContentStyle>
                </Container>
            </RootStyle>
        </Page>
    );
}
