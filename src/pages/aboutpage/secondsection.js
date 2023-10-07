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
import SecondSectionbottom from './SecondSectionbottom';
import { LogoutAction } from 'src/redux/actions/AuthAction';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_image', label: 'Title', alignRight: false },
    { id: 'c_id', label: 'Field', alignRight: false },
];


export default function SecondSection(props) {
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
            .get(`${baseUrlPostGres()}/api//about-corporate-list`, {
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
        formData.append("video", state.image);
        await axios
            .put(`${baseUrlPostGres()}/api/about-corporate-update`, formData, {
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
        <>
            <Page title="User">

                <Container maxWidth="lg">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid xs={10}>
                                <HeaderBreadcrumbs
                                    heading="Banner Video"
                                    links={[
                                        { name: 'Dashboard', href: "/dashboard/app" },
                                        { name: 'Banner Video' }
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
                                        headLabel={TABLE_HEAD}
                                    />
                                    <TableBody>
                                        <TableRow
                                        >
                                            <TableCell component="th" scope="row">1</TableCell>
                                            <TableCell component="th" scope="row" >Banner Video</TableCell>
                                            <TableCell component="th" scope="row" >  <TextField type="file"
                                                accept="video/*"
                                                name="image"
                                                onChange={handleChange}
                                                style={{ width: "100%" }}
                                                sx={{
                                                    ".MuiOutlinedInput-root": {
                                                        paddingLeft:"8px",
                                                        flexDirection: "column"
                                                    },
                                                    img: {
                                                        paddingRight: "1rem",
                                                        height: "100px"
                                                    }
                                                }}
                                                InputProps={{
                                                    startAdornment: (
                                                      <video
                                                        src={
                                                          InputImagestate.video != null
                                                            ? InputImagestate.video
                                                            : state.video !== null
                                                            ? `${baseUrlPostGres()}/${
                                                                state.video
                                                              }`
                                                            : ""
                                                        }
                                                        width="450"
                                                        height="300"
                                                        controls
                                                      />
                                                    ),
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
            <Page style={{ marginTop: "40px" }}>
            </Page>
        </>
    );
}
