import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// components
// _mock_
import { _userList } from '../../_mock';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import ProfileForm from './ProfileForm';
// ----------------------------------------------------------------------

export default function Profile() {
    const { name = '' } = useParams();
    const currentUser = _userList.find((user) => paramCase(user.name) === name);
    return (
        <Page title="Profile">
            <Container maxWidth="lg">
                <HeaderBreadcrumbs
                    heading="Profile"
                    links={[
                        { name: 'Dashboard', href: "/dashboard/app" },
                        { name: 'Profile' },
                    ]}
                />
                <ProfileForm currentUser={currentUser} />
            </Container>
        </Page>
    );
}
