import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { baseUrlPostGres } from 'src/redux/constant';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { toast } from 'react-toastify';
import { CKEditor } from 'ckeditor4-react';
import { Button, Table, TableRow, TableCell, TextField, Grid, Container } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { useDispatch } from 'react-redux';
import { LogoutAction } from 'src/redux/actions/AuthAction';
export default function MinimizLogistical() {
    const dispatch=useDispatch()

    const [value, setValue] = React.useState('1');
    const [slug, setSlug] = React.useState("page-common/training");
    const [state, setState] = useState()
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
            .get(`${baseUrlPostGres()}/api/min-logistical-list`, {
                headers: apiHeader()
            })
            .then(response => {
              if(response.data.message==="Unauthorized please login again!"){
                    dispatch(LogoutAction(response.data.message)) 
                 }
                console.log("GetUpcomingMatchListAction Response is", response)
                setState(response.data.success[0])
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
        // console.log(PopUpstate, "e.target.value");
        if (e.target) {
            var { name, value } = e.target;
            console.log({ e, name }, "e.target.value");
            if (name === "image" || name === "icon") {
                var file = e.target.files[0]
                setState({ ...state, [name]: file })
                getBase64(file, name);
            }
            else {
                setState({ ...state, [name]: value })
            }
        }
        else {
            var name = e.editor.name;
            var value = e.editor.getData()
            if (name === "first_description" || name === "last_description" || name == "codes") {
                // PopUpstate[name] = value
                const name = e.editor.name;
                console.log({ e, name }, "e.target.value");
                const value = e.editor.getData()
                // setState({ ...PopUpstate, })
                setState((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    }


    const SubmitData = async () => {
        let formData = new FormData();
        formData.append("id", state.id);
        formData.append("image", state.image);
        // formData.append("icon", state.icon);
        // formData.append("content_description", state.content_description);
        formData.append("first_description", state.first_description);
        formData.append("last_description", state.last_description);
        // formData.append("tittle", state.tittle);
        await axios
            .post(`${baseUrlPostGres()}/api/min-logistical-update`, formData, {
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
                console.log("user list error", errors);
            })
    }

    return (<>
        <Container maxWidth="lg">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                        <HeaderBreadcrumbs
                            heading='Minimize Logistical'
                            links={[
                                { name: 'Dashboard', href: "/dashboard/app" },
                                { name: 'Minimize Logistical' }
                            ]}
                        />
                    </Grid>
                </Grid>

            </Box>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Table>
                    {/* {state &&
                        <TableRow
                        >
                            <TableCell component="th" scope="row">1</TableCell>
                            <TableCell component="th" scope="row" > Heading</TableCell>
                            <TableCell component="th" scope="row" >  <TextField
                                value={state.tittle}
                                name="tittle"
                                onChange={handleChange}
                                style={{ width: "100%" }}
                            /></TableCell>
                        </TableRow>
                    } */}
                    {state &&
                        <TableRow
                        >
                            <TableCell component="th" scope="row">1</TableCell>
                            <TableCell component="th" scope="row" > Image</TableCell>
                            <TableCell component="th" scope="row" ><TextField type="file" name="image"
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
                                    startAdornment: <img alt=""  src={InputImagestate.image != null
                                        ? InputImagestate.image : `${baseUrlPostGres()}/${state.image}`} />
                                }}
                            /></TableCell>
                        </TableRow>
                    }
                </Table>
                {state &&
                    <div className="App">
                        {console.log("sssssssssssssssssss", state.codes)}
                        <h2>First Description</h2>
                        <CKEditor
                            name="first_description"
                            initData={state.first_description}
                            // data={state.first_description}
                            onChange={handleChange}
                        />
                    </div>
                }
                {
                    state &&
                    <div className="App">
                        <h2>Last Description</h2>
                        <CKEditor
                            initData={state.last_description}
                            name="last_description"
                            onInstanceReady={() => {
                            }}
                            onChange={handleChange}
                        />
                    </div>
                }
                <Button variant="contained" style={{ margin: "20px" }} alignRight="true"
                    onClick={SubmitData}
                >Submit</Button>
            </Box>
        </Container>
    </>
    );
}
