import React, { useEffect, useState, } from 'react'
// material
import { Avatar, Box, Button, Card, CardContent, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Modal, Stack, Typography } from '@mui/material';
import { useLocation,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';
import { UserDetailAction, AcceptRejectAction } from '../redux/actions/UsersAction'
// components
import Label from '../components/Label';
import Page from '../components/Page';
import Iconify from '../components/Iconify';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
export default function UserDetails() {
  const location = useLocation();
  const dispatch = useDispatch();
  const selectorData = useSelector(state => state)
  console.log("Selector data is",selectorData)
  const UserDetail = useSelector(state => state.users.user_detail.data)
  const VerificationResponse = useSelector(state => state.users.user_verification.data)
  const isLoading = useSelector(state => state.users.loading)
  const UserDetailUpdated = UserDetail !== undefined && UserDetail.data
  let { id } = useParams();
  console.log("id is", id)
  console.log("isLoading", isLoading);

  const [userModal, setUserModal] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState();

  console.log("verificationStatus", verificationStatus);

  const confirmationModalOpen = (value) => {
    console.log("value is", value)
    setUserModal(true)
    setVerificationStatus(value)
  }
  const confirmationModalClose = () => setUserModal(false)

  console.log("UserDetail", UserDetailUpdated);

  useEffect(() => {
    dispatch(UserDetailAction({ user_id: location.state }))
  }, [location.state])

  console.log("location", location);

  const AcceptReject = (e) => {
    console.log("Cliked")
    dispatch(AcceptRejectAction({
      id: id,
      status: verificationStatus,
    }))
    // dispatch(UserDetailAction({ user_id: location.state }))
  }

  useEffect(() => {
    // dispatch(UserDetailAction({ user_id: location.state }))
    setUserModal(false)
  }, [selectorData.users.user_verification])

  // if(VerificationResponse !== undefined && VerificationResponse.status === '200') {
  //   setUserModal(false)
  // }

  

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    borderRadius: '15px'
  }

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
        </Stack>

        <Card spacing={2}>
          <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar {...stringAvatar(`${UserDetailUpdated.first_name} ${UserDetailUpdated.last_name}`)} sx={{ width: 100, height: 100, fontSize: 30 }} />
            <CardContent sx={{ pl: 3, flex: '1 0 auto' }}>
              <Typography gutterBottom variant="h4" component="div"> {UserDetailUpdated.first_name} {UserDetailUpdated.middle_name} {UserDetailUpdated.last_name} </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: #{UserDetailUpdated.id_number}
                &nbsp;&nbsp;
                <Label variant="ghost" color={UserDetailUpdated.is_verify_id_no === 0 ? 'error' : 'success'}>
                  {UserDetailUpdated.is_verify_id_no === 0 ? "Unverified" : "Verified"}
                </Label>
              </Typography>
            </CardContent>
            <CardContent sx={{}}>
              <div className='custom-btn-group'>
                <Button variant="contained" onClick={() => confirmationModalOpen(1)} color="success"><Iconify icon="teenyicons:tick-solid" sx={{ mr: .5, }} /> Accept</Button>
                <Button variant="contained" onClick={() => confirmationModalOpen(2)} color="error"><Iconify icon="clarity:close-line" sx={{ mr: .5, }} width={20} height={20} /> Reject</Button>
              </div>
            </CardContent>
          </CardContent>
          <Divider />
          <CardContent >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ mb: 2, }}> Personal Details </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="carbon:user-avatar-filled-alt" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Name"
                          secondary={`${UserDetailUpdated.first_name} ${UserDetailUpdated.middle_name} ${UserDetailUpdated.last_name}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="dashicons:email-alt" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Company Email"
                          secondary={`${UserDetailUpdated.email_id}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="bi:phone-vibrate-fill" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone Number"
                          secondary={`${UserDetailUpdated.phone_no}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="gis:position-man" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Designation"
                          secondary={`${UserDetailUpdated.designation}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5" component="div" sx={{ mt: 4, mb: 2 }}> Company Details </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="carbon:location-company-filled" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Company Legal Name"
                          secondary={`${UserDetailUpdated.comp_legal_name}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="fluent:book-number-20-filled" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Company Registration Number"
                          secondary={`${UserDetailUpdated.comp_regist_no}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="bi:building" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Country of Incorporation"
                          secondary={`${UserDetailUpdated.country_incop}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="cil:industry" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Industry of Operation"
                          secondary={`${UserDetailUpdated.industry_opratn}`}
                        />
                      </ListItem>
                    </List>
                    <Divider />
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem sx={{ p: 0, }}>
                        <ListItemIcon sx={{ minWidth: 40, }}>
                          <Iconify icon="icons8:services" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Countries Require the Services"
                          secondary={`${UserDetailUpdated.services}`}
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem
                        sx={{ p: 0, cursor: 'pointer' }}
                        secondaryAction={
                          <Iconify icon="fa-solid:cloud-download-alt" width={24} height={24} />
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <Iconify icon="ant-design:folder-open-filled" width={24} height={24} />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Company Incorporation Certificate"
                          secondary={`${UserDetailUpdated.comp_incop_certif_url}`}
                        />

                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>

      <Modal
        open={userModal}
        onClose={confirmationModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2" sx={{ mb: 0 }}>
            Confirmation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mb: 3 }}>
            Are you sure you want to do this?
          </Typography>
          <div className='custom-btn-group text-center'>
            <Button variant="contained" color="error" onClick={confirmationModalClose}><Iconify icon="clarity:close-line" sx={{ mr: .5, }} width={20} height={20} /> Cancel</Button>
            <LoadingButton variant="contained" onClick={() => AcceptReject(verificationStatus)} color="success" loading={false}><Iconify icon="teenyicons:tick-solid" sx={{ mr: .5, }} /> Submit</LoadingButton>
          </div>
        </Box>
      </Modal>
    </Page>
  );
}
