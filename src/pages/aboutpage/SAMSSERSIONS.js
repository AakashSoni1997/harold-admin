
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
import { CKEditor } from 'ckeditor4-react';
import { Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { LogoutAction } from 'src/redux/actions/AuthAction';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_id', label: 'Heading', alignRight: false },
    { id: 'c_id', label: 'Image', alignRight: false },
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

export default function SAMASSERSIONS() {
    const [CkData, setCkData] = useState({
        extraAllowedContent: 'span(*)',
        allowedContent: true
      })
    const dispatch=useDispatch()

    const [state, setState] = useState()
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })
    const [PopUpstate, setPopUpstate] = useState({
    })

    

    //open mode 
    const [open, setopen] = useState("")

    const handleClose = () => {
        setupdateModelopen(false)
        setInputImageState({})
    }

    const handleOpen = () => { setopen(true) }

    const [Error, setError] = useState("")

    const [updateModelopen, setupdateModelopen] = useState("")

    // const [updateModeldata, setupdateModeldata] = useState()

    const handleUpdateModelClose = () => {
        setInputImageState({})
        setupdateModelopen(false)
    }

    const handleUpdateModelOpen = () => { setupdateModelopen(true) }

    const UpdatePopUpSubmitData = async (e) => {
        setPopUpstate({})
        setInputImageState("")
        let formData = new FormData();
        formData.append("id", PopUpstate.id);
        // formData.append("description", PopUpstate.description);
        formData.append("tittle", PopUpstate.tittle);
        formData.append("description", PopUpstate.description);
        setupdateModelopen(false)
        await axios
            .put(`${baseUrlPostGres()}/api/about-sem-update`, JSON.stringify({
                "id": PopUpstate.id, "tittle": PopUpstate.tittle, "description": PopUpstate.description
            }), {
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
        // }

    }


    const openhandleUpdateModel = (ele) => {
        setPopUpstate(ele)
        handleUpdateModelOpen(true)
    }

    

    useEffect(() => {
        listCalling()
    }, [])

    const listCalling = () => {
        axios
            .get(`${baseUrlPostGres()}/api/about-sem-list`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                console.log("GetUpcomingMatchListAction Response is", response)
                setState(response.data.success)
            })
            .catch(errors => {
                console.log("user list error", errors);
            })
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

    const handleChange1 = (e) => {
        const name = e.editor.name;
        console.log(e.editor, e.target, "e.target.value");
        const value = e.editor.getData()
        if (name === "content_description" || name === "description" || name == "codes") {
            PopUpstate[name] = value
        }
        // if (name === "image" || name === "icon") {
        //     var file = e.target.files[0]
        //     setState({ ...state, [name]: file })
        //     getBase64(file, name);
        // }
        // else {
        //     setState({ ...state, [name]: value })
        // }
    }


    const ADDPopUpSubmitData = async () => {
        if (PopUpstate?.description  && PopUpstate?.tittle) {
            let formData = new FormData();
            setError("")
            setPopUpstate({})
            setInputImageState("")
            formData.append("description", PopUpstate.description);
            formData.append("tittle", PopUpstate.tittle);
            setopen(false)
            await axios
                .put(`${baseUrlPostGres()}/api/about-sem-update`, formData, {
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
        } else {
            setError("All fields are required*")
        }

    }

    return (
        <Page title="User">
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
                                                <TableRow
                                                >
                                                    <TableCell component="th" scope="row">2</TableCell>
                                                    <TableCell component="th" scope="row" > Description</TableCell>
                                                    <TableCell component="th" scope="row" >

                                                        <div className="App">
                                                            <CKEditor
                                                            config={CkData}
                                                                name="description"
                                                                initData={PopUpstate.description}
                                                                // data={state.first_description}
                                                                onChange={handleChange1}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        }
                                    </Table>

                                </TableContainer>
                            </Scrollbar>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={UpdatePopUpSubmitData}>Submit</Button>
                            <Button variant="contained" style={{ margin: "20px" }} alignRight="true" onClick={handleClose}>Cancel</Button>
                        </Container>
                    </Page>
                </Box>
            </Modal>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                            <HeaderBreadcrumbs
                                heading='SAMSSERSIONS'
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'SAMSSERSIONS' }
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
                                                <TableCell component="th" scope="row" >  <TextField
                                                    value={ele.description}
                                                    name="description"
                                                    style={{ width: "100%" }}
                                                    onChange={handleChange}
                                                /></TableCell>
                                                <TableCell component="th" scope="row" >
                                                    <Button onClick={() => openhandleUpdateModel(ele)}variant="contained"
                             color="success"><Edit /></Button>
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
