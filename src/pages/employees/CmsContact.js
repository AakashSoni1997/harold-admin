import React, { useState, useEffect } from 'react';
// material
import {
    Card, Divider, Table, Button, Checkbox, TableRow, TableBody, TableCell, TextField, Container, Typography, TableContainer, TablePagination, Modal, Box, TableSortLabel,
} from '@mui/material';
// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { UserListHead } from 'src/sections/@dashboard/user';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { baseUrlPostGres } from 'src/redux/constant';
import { toast } from 'react-toastify';
import { LogoutAction } from 'src/redux/actions/AuthAction';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_image', label: 'Title', alignRight: false },
    { id: 'c_id', label: 'Field', alignRight: false },
];


export default function UpcomingMatches(props) {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        id: "",
        image: "",
        icon: '',
        poc: "",
        email: "",
        phone: "",
        address: ""
    })
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })


    useEffect(() => {
        axios
            .get(`${baseUrlPostGres()}/api/contact-us-view`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }

                console.log("GetUpcomingMatchListAction Response is", response.data.success[0])
                setState(response.data.success[0])
                // getBase64(file, name)
                // getBase64(file, name);
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }, [])



    function getBase64(file, name) {


        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(setInputImageState({ ...InputImagestate, [name]: reader.result }));
            reader.onerror = error => reject(error);
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image" || name === "icon") {
            var file = e.target.files[0]
            setState({ ...state, [name]: file })
            getBase64(file, name);
        }
        else {

            setState({ ...state, [name]: value })
        }

    }

    const SubmitData = async () => {
        let formData = new FormData();
        formData.append("id", state.id);
        formData.append("image", state.image);
        formData.append("icon", state.icon);
        formData.append("poc", state.poc);
        formData.append("email", state.email);
        formData.append("phone", state.phone);
        formData.append("address", state.address);
        await axios
            .post(`${baseUrlPostGres()}/api/contact-us-edit`, formData, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                toast("Content update successfully")
                console.log("jgiofjgjgfdgfgfdgGetUpcomingMatchListAction Response is", response.data.success[0].image)
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }
    return (
        <Page title="User">

            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={10}>
                            <HeaderBreadcrumbs
                                heading="CONTACT CMS"
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'ContactCMS' }
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Box>
                {console.log(state, "statestatestate")}
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    // order={order}
                                    // orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                // rowCount={state.totalCountContestList}
                                // numSelected={selected.length}
                                // onRequestSort={handleRequestSort}
                                // onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">1</TableCell>
                                        <TableCell component="th" scope="row" > Banner Image</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField type="file"
                                            accept="image/*"
                                            name="image"
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                            sx={{
                                                ".MuiOutlinedInput-root": {
                                                    paddingTop: "1rem",
                                                    flexDirection: "column"
                                                },
                                                img: {
                                                    paddingRight: "1rem",
                                                    height: "100px"
                                                }
                                            }}
                                            //  && `${JSON.parse(state.BannerImage)}`
                                            InputProps={{
                                                startAdornment: <img alt=""  src={InputImagestate.image != null ? InputImagestate.image : `${baseUrlPostGres()}/${state.image}`} />
                                            }}
                                        /></TableCell>
                                        {console.log("Fdfsdfsdf", state)}
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">2</TableCell>
                                        <TableCell component="th" scope="row" > Icon</TableCell>
                                        <TableCell component="th" scope="row" ><TextField type="file" name="icon"
                                            accept="image/*"
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                            sx={{
                                                ".MuiOutlinedInput-root": {
                                                    paddingTop: "1rem",
                                                    flexDirection: "column"
                                                },
                                                img: {
                                                    paddingRight: "1rem",
                                                    height: "100px"
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: <img alt=""  src={InputImagestate.icon != null ? InputImagestate.icon : `${baseUrlPostGres()}/${state.icon}`} />
                                            }}
                                        /></TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">3</TableCell>
                                        <TableCell component="th" scope="row" > Point Of Contact</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.poc}

                                            name="poc"
                                            pattern="[A-Za-z]*"
                                            inputProps={{
                                              // maxLength: 300,
                                            }}
                                            style={{ width: "100%" }}
                                            onChange={handleChange}
                                        /></TableCell>
                                        {console.log("Fsduifhsjdkfgsjdfs", state)}
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">4</TableCell>
                                        <TableCell component="th" scope="row" >Email </TableCell>
                                        <TableCell component="th" scope="row" >
                                            <TextField
                                                inputProps={{
                                                  // maxLength: 300,
                                                }}
                                                value={state.email}
                                                name="email"
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">5</TableCell>
                                        <TableCell component="th" scope="row" > Phone</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.phone}
                                            type="number"
                                            inputProps={{
                                               // maxLength: 12,
                                            }}
                                            name="phone"
                                            style={{ width: "100%" }}
                                            onChange={handleChange}
                                        /></TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">6</TableCell>
                                        <TableCell component="th" scope="row" > Address</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.address}
                                            name="address"
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                            inputProps={{
                                               // maxLength: 90,
                                            }}
                                        /></TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>

                        </TableContainer>
                    </Scrollbar>

                    <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={SubmitData}>Submit</Button>
                </Card>
            </Container>
        </Page>
    );
}
