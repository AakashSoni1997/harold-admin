import React, { useState, useEffect } from 'react';
// material
import {
    Card, Divider, Table, Button, Checkbox, TableRow, TableBody, TableCell, TextField, Container, Typography, TableContainer, TablePagination, Modal, Box, TableSortLabel, Grid,
} from '@mui/material';
// components
import Page from 'src/components/Page';
import Scrollbar from 'src/components/Scrollbar';
import { UserListHead } from 'src/sections/@dashboard/user';
import axios from 'axios';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { baseUrlPostGres } from 'src/redux/constant';
import { toast } from 'react-toastify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LogoutAction } from 'src/redux/actions/AuthAction';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_id', label: 'Heading', alignRight: false },
    { id: 'c_id', label: 'Action', alignRight: false },
];


const POPUP_TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_id', label: 'Title', alignRight: false },
    { id: 'c_id', label: 'Field', alignRight: false },
];


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: '100vh',
    overflow: 'scroll',
};

export default function SupportServices(props) {
    const dispatch=useDispatch()
    const [state, setState] = useState()
    const [state1, setState1] = useState()
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })
    const [PopUpstate, setPopUpstate] = useState({
    })

    //open mode 
    const [open, setopen] = useState("")

    const handleClose = () => {
        setopen(false)
        setInputImageState({})
    }

    const handleOpen = () => { setopen(true) }

    const [Error, setError] = useState("")

    const [updateModelopen, setupdateModelopen] = useState("")

    // const [updateModeldata, setupdateModeldata] = useState()

    const handleUpdateModelClose = () => {
        setInputImageState({})
        setPopUpstate()
        setupdateModelopen(false)
    }

    const handleUpdateModelOpen = () => { setupdateModelopen(true) }

    const UpdatePopUpSubmitData = async (e) => {
        setPopUpstate({})
        setInputImageState("")
        let formData = new FormData();
        formData.append("id", PopUpstate.id);
        // formData.append("description", PopUpstate.description);
        formData.append("image", PopUpstate.image);
        formData.append("tittle", PopUpstate.tittle);
        setupdateModelopen(false)
        await axios
            .put(`${baseUrlPostGres()}/api/home-slider-update`, formData, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                listCalling1()
                toast("Content Added successfully")

            })
            .catch(errors => {
                console.log("user list error", errors);
            })
        // }

    }


    const openhandleUpdateModel = (ele) => {
        setPopUpstate(ele)
        handleUpdateModelOpen(true)
    }

    


    console.log(state, "ContactCMSListDatafsdfsdfs");




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
            setPopUpstate({ ...PopUpstate, [name]: file })
            getBase64(file, name);
        }
        else {
            setPopUpstate({ ...PopUpstate, [name]: value })
        }
    }


    const ADDPopUpSubmitData = async () => {
        if (PopUpstate?.image && PopUpstate?.tittle) {
            let formData = new FormData();
            setError("")
            setPopUpstate({})
            setInputImageState("")
            // formData.append("description", PopUpstate.description);
            formData.append("image", PopUpstate.image);
            formData.append("tittle", PopUpstate.tittle);
            setopen(false)
            await axios
                .post(`${baseUrlPostGres()}/api/home-slider-add`, formData, {
                    headers: apiHeader()
                })
                .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                    listCalling1()
                    toast("Content Added successfully")
                })
                .catch(errors => {
                    console.log("user list error", errors);
                })
        } else {
            setError("All fields are required*")
        }

    }

    const openhandleDeleteModel = async (ele) => {
        let formData = new FormData();
        formData.append("description", ele.id);
        setopen(false)
        await axios.delete(`${baseUrlPostGres()}/api/home-slider-delete/${ele.id}`, {
            headers: apiHeader()
        })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                listCalling1()
                toast("Content Added successfully")

            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }




    useEffect(() => {
        listCalling()
        listCalling1()
    }, [])

    const listCalling = () => {
        axios
            .get(`${baseUrlPostGres()}/api/home-service-list`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                console.log("GetUpcomingMatchListAction Response is", response.data.success[0])
                setState1(response.data.success[0])
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }
    const listCalling1 = () => {
        axios
            .get(`${baseUrlPostGres()}/api/home-slider-list`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                console.log("GetUpcomingMatchListAction Response is", response.data.success[0])
                setState(response.data.success)
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }

    const changeState1 = (e) => {
        console.log(state1, "state1state211432");
        setState1({ ...state1, [e.target.name]: e.target.value })
    }
    const UpdateState1SubmitData = async () => {
        let data = JSON.stringify(state1)
        await axios
            .post(`${baseUrlPostGres()}/api/home-service-update`, data, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                listCalling()
                toast("Content Added successfully")

            })
            .catch(errors => {
                console.log("user list error", errors);
            })
    }

    return (
        <Page title="User">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Page title="User">
                        <Container maxWidth="lg">
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 800 }}>
                                    <Table>
                                        <UserListHead
                                            headLabel={POPUP_TABLE_HEAD}
                                        />
                                        {state &&
                                            <TableBody>
                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">1</TableCell>
                                                    <TableCell component="th" scope="row" > Banner Image</TableCell>
                                                    <TableCell component="th" scope="row" >  <TextField type="file"
                                                        accept="video/*"
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
                                                        //  && `${ JSON.parse(state.BannerImage) } `
                                                        InputProps={{
                                                            startAdornment: <img alt=""  src={InputImagestate.image != null && InputImagestate.image} />
                                                        }}
                                                    /></TableCell>
                                                </TableRow>

                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">2</TableCell>
                                                    <TableCell component="th" scope="row" > Heading</TableCell>
                                                    <TableCell component="th" scope="row" >  <TextField
                                                        value={state.tittle}
                                                        inputProps={{
                                                          // maxLength: 300,
                                                        }}
                                                        name="tittle"
                                                        style={{ width: "100%" }}
                                                        onChange={handleChange}
                                                    /></TableCell>
                                                </TableRow>
                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">{Error}</TableCell>

                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>

                                </TableContainer>
                            </Scrollbar>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={ADDPopUpSubmitData}>Submit</Button>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={handleClose}>Cancel</Button>
                        </Container>
                    </Page>
                </Box>
            </Modal>
            <Modal
                open={updateModelopen}
                onClose={handleUpdateModelClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Page title="User">
                        <Container maxWidth="lg">
                            <Scrollbar>
                                <TableContainer sx={{ minWidth: 800 }}>
                                    <Table>
                                        <UserListHead
                                            headLabel={POPUP_TABLE_HEAD}
                                        />
                                        {PopUpstate &&
                                            <TableBody>
                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">1</TableCell>
                                                    <TableCell component="th" scope="row" > Banner Image</TableCell>
                                                    <TableCell component="th" scope="row" >  <TextField type="file"
                                                        accept="video/*"
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
                                                        //  && `${ JSON.parse(state.BannerImage) } `
                                                        InputProps={{
                                                            startAdornment: <img alt=""  src={PopUpstate.image != null && `${baseUrlPostGres()}/${PopUpstate.image}`} />
                                                        }}
                                                    /></TableCell>
                                                </TableRow>
                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">2</TableCell>
                                                    <TableCell component="th" scope="row" > Heading</TableCell>
                                                    <TableCell component="th" scope="row" >  <TextField
                                                        value={PopUpstate.tittle}
                                                        name="tittle"
                                                        inputProps={{
                                                          // maxLength: 300,
                                                        }}
                                                        style={{ width: "100%" }}
                                                        onChange={handleChange}
                                                    /></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>

                                </TableContainer>
                            </Scrollbar>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={UpdatePopUpSubmitData}>Submit</Button>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={handleUpdateModelClose}>Cancel</Button>
                        </Container>
                    </Page>
                </Box>
            </Modal>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                            <HeaderBreadcrumbs
                                heading='Support Services'
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'Support Services Scetion' }
                                ]}
                            />
                            <Button variant="contained" style={{ margin: "50px" }} alignRight="true" onClick={handleOpen}>Add Services</Button>
                        </Grid>
                    </Grid>

                </Box>
                <Scrollbar>
                    {state1 &&
                        <TableRow>
                            {console.log(state1, "statestate")}
                            <TableCell component="th" scope="row">1</TableCell>
                            <TableCell component="th" scope="row" > Heading</TableCell>
                            <TableCell component="th" scope="row" >  <TextField
                                value={state1.tittle}
                                name="tittle"
                                onChange={changeState1}
                                style={{ width: "100%" }}
                            /></TableCell>
                        </TableRow>
                    }
                    {state1 &&
                        <TableRow>
                            <TableCell component="th" scope="row">2</TableCell>
                            <TableCell component="th" scope="row" > Description</TableCell>
                            <TableCell component="th" scope="row" > <TextField
                                value={state1.sidebar_description}
                                onChange={changeState1}
                                name="sidebar_description"
                                style={{ width: "100%" }}
                            /></TableCell>
                        </TableRow>
                    }
                    <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={UpdateState1SubmitData}>Submit</Button>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                headLabel={TABLE_HEAD}
                            />
                            {state &&
                                state.map((ele, i) => {
                                    return (<>
                                        <TableBody>
                                            <TableRow
                                            >
                                                <TableCell component="th" scope="row">{i + 1}</TableCell>
                                                <TableCell component="th" scope="row" >  <TextField
                                                    value={ele.tittle}
                                                    name="tittle"
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                /></TableCell>
                                                <TableCell component="th" scope="row" >
                                                    
                                                    <Button onClick={() => openhandleUpdateModel(ele)}variant="contained"
                             color="success"><Edit /></Button>
                                                    <Button onClick={() => openhandleDeleteModel(ele)} >D</Button>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>

                                    </>)
                                })}
                        </Table>

                    </TableContainer>
                </Scrollbar>
            </Container>
        </Page>
    );
}
