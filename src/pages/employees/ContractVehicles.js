import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import { baseUrlPostGres } from 'src/redux/constant';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { toast } from 'react-toastify';
import { CKEditor } from 'ckeditor4-react';
import { Button, Grid } from '@mui/material';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import { useDispatch } from 'react-redux';
import { LogoutAction } from 'src/redux/actions/AuthAction';

export default function BaneerPart1() {
    const dispatch=useDispatch()

    const [value, setValue] = React.useState('1');
    const [state, setState] = useState()
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })





    useEffect(() => {
        axios
            .get(`${baseUrlPostGres()}/api/employee-list`, {
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
        const name = e.editor.name;
        console.log(e.editor, e.target, "e.target.value");
        const value = e.editor.getData()
        if (name === "content_description" || name === "description" || name == "codes") {
            state[name] = value
        } if (name === "image" || name === "icon") {
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
        formData.append("id", 1);
        // formData.append("image", state.image);
        formData.append("change_tittle", "tittle");
        formData.append("head_line", state.description);
        await axios
            .put(`${baseUrlPostGres()}/api/employee-update`, formData, {
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

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container >
                    <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                        <HeaderBreadcrumbs
                            heading='Notice'
                            links={[
                                { name: 'Dashboard', href: "/dashboard/app" },
                                { name: 'Notice' }
                            ]}
                        />
                    </Grid>
                </Grid>

            </Box>
            {state &&
                <div className="App">
                    {console.log(state, "statestatestatestate")}
                    <CKEditor
                        initData={state.head_line}
                        onInstanceReady={() => {
                        }}
                        name="description"
                        onChange={handleChange}
                    />
                </div>
            }
            <Button variant="contained" style={{ margin: "20px" }} alignRight="true"
                onClick={SubmitData}
            >Submit</Button>
        </Box>

    );
}
