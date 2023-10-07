import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import { baseUrlPostGres } from 'src/redux/constant';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { TableBody, TableCell, TableRow, TableContainer, Table, TextField, Button } from '@mui/material';
import { UserListHead } from 'src/sections/@dashboard/user';
import { toast } from 'react-toastify';
import { LogoutAction } from 'src/redux/actions/AuthAction';
import { useDispatch } from 'react-redux';

const TABLE_HEAD = [
    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_image', label: 'Title', alignRight: false },
    { id: 'c_id', label: 'Field', alignRight: false },
];

export default function HomeSecondSection(props) {
    const dispatch=useDispatch()

    const [value, setValue] = React.useState('1');
    const [slug, setSlug] = React.useState("page-common/training");
    // const [listData, setlistData] = React.useState('1');
    const [state, setState] = useState({})
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })



    const handleTabChange = (event, newValue) => {
        setValue(newValue);
        console.log(event, "eventeventevent")
        setSlug(event.target.name)
    };


    useEffect(() => {
        axios
            .get(`${baseUrlPostGres()}/api/${slug}`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                console.log("GetUpcomingMatchListAction Response is", response.data.success[0])
                setState(response.data.success[0])
            })
            .catch(errors => {
                toast(errors.message)
                console.log("user list error", errors);
            })
    }, [slug])

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
        } else if (name === "doc_pdf") {
            console.log(e.target.files, "e.target.files");
            var file = e.target.files[0]
            setState({ ...state, [name]: e.target.files[0] })
        }
        else {

            setState({ ...state, [name]: value })
        }

    }

    const SubmitData = async () => {
        let slugvariable = "page-common-update"
        if (slug == "home-foreign-list") {
            slugvariable = "home-foreign-update"
        }
        let formData = new FormData();
        formData.append("id", state.id);
        formData.append("image", state.image);
        formData.append("icon", state.icon);
        formData.append("page_name", state.page_name);
        formData.append("description", state.description);
        formData.append("naics_code", state.naics_code);
        formData.append("doc_pdf", state.doc_pdf);
        await axios
            .post(`${baseUrlPostGres()}/api/${slugvariable}`, formData, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                toast("Content upload successfully")
                console.log("jgiofjgjgfdgfgfdgGetUpcomingMatchListAction Response is", response.data.success[0].image)
            })
            .catch(errors => {
                console.log("user list errorrrrrrrrrrrrrrrrr", errors);
            })
    }

    return (

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="Training" value="1" name="page-common/training" />
                        <Tab label="Services" value="2" name="page-common/services" />
                        <Tab label="Logistics" value="3" name="page-common/logistics" />
                        <Tab label="Foreign Military" value="4" name="home-foreign-list" />
                    </TabList>
                </Box>
                {state !== undefined &&
                    <TabPanel value={value}>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    headLabel={TABLE_HEAD}
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
                                            InputProps={{
                                                startAdornment: <img alt=""  src={InputImagestate.image != null
                                                    ? InputImagestate.image : `${baseUrlPostGres()}/${state.image}`} />
                                            }}
                                        /></TableCell>
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
                                                startAdornment: <img alt=""  src={InputImagestate.icon != null
                                                    ? InputImagestate.icon : `${baseUrlPostGres()}/${state.icon}`} />
                                            }}
                                        /></TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">3</TableCell>
                                        <TableCell component="th" scope="row" > Heading</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.page_name}
                                            name="page_name"
                                            inputProps={{
                                               // maxLength: 150,
                                            }}
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                        /></TableCell>
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">4</TableCell>
                                        <TableCell component="th" scope="row" > Description </TableCell>
                                        <TableCell component="th" scope="row" >  <TextField
                                            value={state.description}
                                            name="description"
                                            style={{ width: "100%" }}
                                            inputProps={{
                                               // maxLength: 200,
                                            }}
                                            onChange={handleChange}
                                        /></TableCell>
                                        {console.log("Fsduifhsjdkfgsjdfs", state)}
                                    </TableRow>
                                    <TableRow
                                    >
                                        <TableCell component="th" scope="row">5</TableCell>
                                        <TableCell component="th" scope="row" > Document</TableCell>
                                        <TableCell component="th" scope="row" >  <TextField type="file"
                                            inputProps={{ accept: "application/pdf" }}
                                            accept="application/pdf"

                                            name="doc_pdf"
                                            onChange={handleChange}
                                            style={{ width: "100%" }}
                                            sx={{
                                                ".MuiOutlinedInput-root": {
                                                    paddingLeft: "8px",
                                                    flexDirection: "column"
                                                },
                                                img: {
                                                    paddingRight: "1rem",
                                                    height: "100px"
                                                },
                                            }}
                                        /></TableCell>
                                    </TableRow>
                                    {state.naics_code &&
                                        <TableRow
                                        >
                                            <TableCell component="th" scope="row">6</TableCell>
                                            <TableCell component="th" scope="row" >NAICS Codes </TableCell>
                                            <TableCell component="th" scope="row" >
                                                <TextField
                                                    value={state.naics_code}
                                                    inputProps={{
                                                       // maxLength: 45,
                                                    }}
                                                    name="naics_code"
                                                    onChange={handleChange}
                                                    style={{ width: "100%" }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                }
            </TabContext>
            <Button variant="contained" style={{ margin: "20px" }} alignRight="true"
                onClick={SubmitData}
            >Submit</Button>
        </Box>

    );
}
