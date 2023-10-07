
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
    { id: 'c_id', label: 'Description', alignRight: false },
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

export default function ContractVehiclesTrainging() {
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
        formData.append("image", PopUpstate.image);
        formData.append("description", PopUpstate.description);
        formData.append("tittle", PopUpstate.tittle);
        setupdateModelopen(false)
        await axios
            .put(`${baseUrlPostGres()}/api/training-design-update`, formData, {
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
            .get(`${baseUrlPostGres()}/api/training-design-list`, {
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
        // console.log(PopUpstate, "e.target.value");
        if (e.target) {
            var { name, value } = e.target;
            console.log({ e, name }, "e.target.value");
            if (name === "image" || name === "icon") {
                var file = e.target.files[0]
                setPopUpstate({ ...PopUpstate, [name]: file })
                getBase64(file, name);
            }
            else {
                setPopUpstate({ ...PopUpstate, [name]: value })
            }
        }
        else {
            var name = e.editor.name;
            var value = e.editor.getData()
            if (name === "content_description" || name === "description" || name == "codes") {
                // PopUpstate[name] = value
                const name = e.editor.name;
                console.log({ e, name }, "e.target.value");
                const value = e.editor.getData()
                // setPopUpstate({ ...PopUpstate, })
                setPopUpstate((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    }

    const handleChange1 = (e) => {
        const name = e.editor.name;
        const value = e.editor.getData()
        console.log(value, "e.target.value");

        // if (name === "image" || name === "icon") {
        //     var file = e.target.files[0]
        //     setState({ ...state, [name]: file })
        //     getBase64(file, name);
        // }
        // else {
        //     setState({ ...state, [name]: value })
        // }
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
                    {console.log(PopUpstate, "PopUpstatePopUpstatePopUpstatePopUpstate")}
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
                                                <TableRow>
                                                    <TableCell component="th" scope="row">1</TableCell>
                                                    <TableCell component="th" scope="row" > Banner Image</TableCell>
                                                    <TableCell component="th" scope="row" >
                                                        <TextField className='file-upload-btn' type="file"
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
                                                        // InputProps={{
                                                        //     startAdornment: <img src={InputImagestate.image != null ? InputImagestate.image : state.image !== null ? `${baseUrlPostGres()}/${state.image}` : ""} />
                                                        // }}
                                                        /></TableCell>
                                                </TableRow>
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
                                                                name="description"
                                                                initData={PopUpstate.description}
                                                                // data={state.first_description}
                                                                onChange={handleChange}
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
                                heading='Design CMS'
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'Design' }
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
