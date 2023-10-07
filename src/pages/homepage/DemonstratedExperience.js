import React, { useState, useEffect } from 'react';
// material
import {
    Card, Divider, Table, Button, Checkbox, TableRow, TableBody, TableCell, TextField, Container, Typography, TableContainer, TablePagination, Modal, Box, TableSortLabel, Grid,
} from '@mui/material';
// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { UserListHead } from 'src/sections/@dashboard/user';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { baseUrlPostGres } from 'src/redux/constant';
import { toast } from 'react-toastify';
import { getHomePage } from 'src/redux/actions/PageActions';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { LogoutAction } from 'src/redux/actions/AuthAction';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_image', label: 'Title', alignRight: false },
    { id: 'c_id', label: 'Field', alignRight: false },
];


export default function DemonstratedExperience(props) {
    const dispatch = useDispatch()
    const ContactCMSListData = useSelector(state => state.Page?.page_list?.data?.success[0])
    const [state, setState] = useState({
    })
    const [InputImagestate, setInputImageState] = useState({
        image: null,
    })
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        dispatch(getHomePage("dem-exprience-list"))
    }, [])


    console.log(state, "ContactCMSListDatafsdfsdfs");


    useEffect(() => {
        if (ContactCMSListData) {
            setState(ContactCMSListData)
        }
    }, [ContactCMSListData])





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


    function getBase64(file, name) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(setInputImageState({ ...InputImagestate, [name]: reader.result }));
            reader.onerror = error => reject(error);
        });
    }

    const handleChange1 = (e) => {
        const { name, value, files } = e.target;
        if (e.target.files) {
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setInputImageState({ ...InputImagestate, [name]: filesArray })
            Array.from(e.target.files).map(
                (file) => URL.revokeObjectURL(file) // avoid memory leak
            );
            let arr = []
            for (let i = 0; i < files.length; i++) {
                var file = e.target.files[i]
                arr.push(file)
            }
            setState({ ...state, [name]: arr });
        }
    };

    const openhandleDeleteModel = async (ele) => {

        let formData = new FormData();
        formData.append("description", ele.id);
        await axios.delete(`${baseUrlPostGres()}/api/dem-exp-logo-delete/${ele.id}`, {
            headers: apiHeader()
        })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                toast("Content Added successfully")
                dispatch(getHomePage("dem-exprience-list"))
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }

    const renderPhotos = (source) => {
        console.log('source: ', source);
        return source.map((photo) => {
            return (
                <>
                    {
                        InputImagestate.icon ?
                            (
                                <img alt=""  src={photo} key={photo} />) :
                            (<div style={{ display: "flex" }}>
                                <img alt=""  src={`${baseUrlPostGres()}/${photo.icon}`} />
                                <button onClick={() => openhandleDeleteModel(photo)} >x</button>
                            </div>)
                    }
                </>
            );
        });
    };


    const SubmitData = async () => {
        console.log("fhsjkdfhsjkdfsfds", state);
        let formData = new FormData();
        formData.append("id", ContactCMSListData?.id);
        formData.append("description", state.description);
        formData.append("image", state.image);
        formData.append("tittle", state.tittle);
        
        await axios
            .post(`${baseUrlPostGres()}/api/dem-exprience-update`, formData, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                toast("Content update successfully")
                dispatch(getHomePage("dem-exprience-list"))
                console.log("jgiofjgjgfdgfgfdgGetUpcomingMatchListAction Response is", response.data.success[0].image)
            })
            .catch(errors => {
                toast(errors.message)
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
                                heading="DEMONSTRATED EXPERIENCE CMS"
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'Demonstrated Experience' }
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                headLabel={TABLE_HEAD}
                            />
                            {ContactCMSListData &&
                                <TableBody>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">1</TableCell>
                                        <TableCell component="th" scope="row" > Banner Image</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField type="file"
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
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">2</TableCell>
                                        <TableCell component="th" scope="row" > Heading</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.tittle}
                                            name="tittle"
                                            style={{ width: "100%" }}
                                            inputProps={{
                                               // maxLength: 300,
                                            }}
                                            onChange={handleChange}
                                        /></TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">3</TableCell>
                                        <TableCell component="th" scope="row" > Description</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.description}
                                            name="description"
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                            inputProps={{
                                               // maxLength: 400,
                                            }}
                                        /></TableCell>
                                    </TableRow>
                                    {/* <TableRow
                                    >
                                        <TableCell component="th" scope="row">4</TableCell>
                                        <TableCell component="th" scope="row" > Partners</TableCell>
                                        <TableCell component="th" scope="row" >
                                            <TextField
                                                type="file"
                                                // accept="video/*"
                                                name="icon"
                                                onChange={handleChange1}
                                                style={{ width: "100%" }}
                                                sx={{
                                                    ".MuiOutlinedInput-root": {
                                                        paddingLeft: "8px",
                                                        flexDirection: "column"
                                                    },
                                                    img: {
                                                        paddingRight: "1rem",
                                                        height: "100px"
                                                    }
                                                }}
                                                //  && `${JSON.parse(state.BannerImage)}`
                                                inputProps={{
                                                    multiple: true
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow> */}
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row"></TableCell>
                                        <TableCell component="th" scope="row" ></TableCell>
                                        <TableCell component="th" scope="row" >
                                            {console.log(state, "statestatestatestatestate")}
                                            <div className="result">{InputImagestate.icon ? renderPhotos(InputImagestate.icon)
                                                : state.home_dem_experience_logos ? renderPhotos(state.home_dem_experience_logos) : ""}</div>
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            }
                        </Table>

                    </TableContainer>
                </Scrollbar>
                <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={SubmitData}>Submit</Button>
            </Container>
        </Page>
    );
}
