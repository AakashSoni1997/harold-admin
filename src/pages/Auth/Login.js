// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
// sections
import { LoginForm } from '../../sections/auth/login';

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

// #161d31

// ----------------------------------------------------------------------

export default function Login() {
	const smUp = useResponsive('up', 'sm');
	return (
		<Page title="Login" className="auth-body">
			<RootStyle>
				<Container maxWidth="sm">
					<ContentStyle>
						<div className='text-center mb-3'>
							<img src="/static/aha-logo.png" width={300} alt="Credexon Sports" />
						</div>
						<div className='auth-container'>
							<Typography variant="h4" align="center" gutterBottom>
								Sign in to AHA Admin
							</Typography>

							<Typography sx={{ color: 'text.secondary', mb: 5 }} align="center">Enter your details below.</Typography>

							<LoginForm />
						</div>
					</ContentStyle>
				</Container>
			</RootStyle>
		</Page>
	);
}
