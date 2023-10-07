import React from "react";
// material
import {
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Container,
  TableContainer,
  Box,
  Grid,
  Modal,
} from "@mui/material";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import { UserListHead } from "src/sections/@dashboard/user";
import { useDispatch, useSelector } from "react-redux";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { CKEditor } from "ckeditor4-react";
import {
  AddLogisticsExperience,
  DeleteLogisticsExperience,
  GetLogisticsCapabilitiesList,
  GetLogisticsExperienceList,
  UpdateLogisticsCapabilities,
  UpdateLogisticsExperience,
} from "src/redux/actions/LogisticsAction";
import { baseUrlPostGres } from "src/redux/constant";
import { useState } from "react";
import { useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { AddServicesExperience, DeleteServicesExperience, GetServicesExperienceList, UpdateServicesExperience } from "src/redux/actions/ServicesActions";

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_title", label: "Title", alignRight: false },
  { id: "c_description", label: "Description", alignRight: false },
  { id: "c_totalvalue", label: "TotalValue", alignRight: false },

];

const POPUP_TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_id", label: "Title", alignRight: false },
  { id: "c_id", label: "Field", alignRight: false },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    maxHeight: '100vh',
    overflow: 'scroll',
};

export const ServicesExperience = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [open, setopen] = useState("");
  const [updateModelopen, setupdateModelopen] = useState("");
  const [Error, setError] = useState("");
  const [PopUpstate, setPopUpstate] = useState({});
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  const experienceList=useSelector((state)=>state.services?.services_experience_list?.success);
  const updateData=useSelector((state)=>state.services?.services_experience_update);
  const addData=useSelector((state)=>state.services?.services_experience_add);
  console.log(updateData,"updateData");

  useEffect(()=>{
    setState(experienceList)
  },[experienceList])

  useEffect(() => {
    dispatch(GetServicesExperienceList());
  }, [dispatch,updateData,addData]);



  const handleClose = () => {
    setopen(false);
    setInputImageState({});
  };

  const handleOpen = () => {
    setopen(true);
  };

  const handleUpdateModelClose = () => {
    setInputImageState({});
    setPopUpstate();
    setupdateModelopen(false);
  };

  const handleUpdateModelOpen = () => {
    setupdateModelopen(true);
  };

  const UpdatePopUpSubmitData = async (e) => {
    setPopUpstate({});
    setInputImageState("");
    let formData = new FormData();
      formData.append("id", PopUpstate.id);
      formData.append("description", PopUpstate.description);
      formData.append("image", PopUpstate.image);
      formData.append("tittle", PopUpstate.tittle);
      formData.append("total_value", PopUpstate.total_value);
      setupdateModelopen(false);
      dispatch(UpdateServicesExperience(formData))
     
  };


  function getBase64(file, name) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(
          setInputImageState({ ...InputImagestate, [name]: reader.result }),
        );
      reader.onerror = (error) => reject(error);
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
    console.log(PopUpstate,"PopUpstateeeeeeeeeeeeeeeeeeeeeeeeeeee");
    if (PopUpstate?.description && PopUpstate?.image && PopUpstate?.tittle && PopUpstate?.total_value) {
      let formData = new FormData();
      setError("");
      setPopUpstate({});
      setInputImageState("");
      formData.append("description", PopUpstate.description);
      formData.append("image", PopUpstate.image);
      formData.append("tittle", PopUpstate.tittle);
      formData.append("total_value", PopUpstate.total_value);
      setopen(false);
      dispatch(AddServicesExperience(formData))
    } else {
      setError("All fields are required*");
    }
  };

  const openhandleDeleteModel = async (ele) => {
    console.log(ele,"eleeeeeeeeeeeeeeeeeeeeee");
    let formData = new FormData();
    formData.append("description", ele.id);
    setopen(false);
    dispatch(DeleteServicesExperience(ele.id))
  };

  const openhandleUpdateModel = (ele) => {
    setPopUpstate(ele);
    handleUpdateModelOpen(true);
  };

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
                  <UserListHead headLabel={POPUP_TABLE_HEAD} />
                  {state && (
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Banner Image
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            type="file"
                            accept="video/*"
                            name="image"
                            onChange={handleChange}
                            style={{ width: "100%" }}
                            sx={{
                              ".MuiOutlinedInput-root": {
                                paddingTop: "1rem",
                                flexDirection: "column",
                              },
                              img: {
                                paddingRight: "1rem",
                                height: "100px",
                              },
                            }}
                            //  && `${JSON.parse(state.BannerImage)}`
                            InputProps={{
                              startAdornment: (
                                <img
                                  alt=""
                                  src={
                                    InputImagestate.image != null &&
                                    InputImagestate.image
                                  }
                                />
                              ),
                            }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          2
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Head Line
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={state.tittle}
                            inputProps={{
                             // maxLength: 300,
                            }}
                            name="tittle"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          3
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Description
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={state.description}
                            name="description"
                            onChange={handleChange}
                            inputProps={{
                             // maxLength: 800,
                            }}
                            style={{ width: "100%" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          4
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Total Value
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={state.total_value}
                            name="total_value"
                           inputProps={{
                           // maxLength:50
                           }}
                            onChange={handleChange}
                            style={{ width: "100%" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {Error}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <Button
              variant="contained"
              style={{ margin: "20px" }}
              alignRight="true"
              onClick={ADDPopUpSubmitData}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ margin: "20px" }}
              alignRight="true"
              onClick={handleClose}
            >
              Cancel
            </Button>
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
                  <UserListHead headLabel={POPUP_TABLE_HEAD} />
                  {PopUpstate && (
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Banner Image
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            type="file"
                            accept="video/*"
                            name="image"
                            onChange={handleChange}
                            style={{ width: "100%" }}
                            sx={{
                              ".MuiOutlinedInput-root": {
                                paddingTop: "1rem",
                                flexDirection: "column",
                              },
                              img: {
                                paddingRight: "1rem",
                                height: "100px",
                              },
                            }}
                            InputProps={{
                              startAdornment: (
                                <img
                                  alt=""
                                  src={
                                    InputImagestate.image != null
                                      ? InputImagestate.image
                                      : `${baseUrlPostGres()}/${
                                          PopUpstate.image
                                        }`
                                  }
                                />
                              ),
                            }}
                          />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell component="th" scope="row">
                          2
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Head Line
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={PopUpstate.tittle}
                            name="tittle"
                            inputProps={{
                             // maxLength: 200,
                            }}
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          3
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Description
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={PopUpstate.description}
                            // id="outlined-multiline-static"
                            // multiline
                            // rows={10}
                            // variant="outlined"
                            name="description"
                            onChange={handleChange}
                            inputProps={{
                             // maxLength: 800,
                            }}
                            style={{ width: "100%" }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          4
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Total Value
                        </TableCell>
                        {console.log(PopUpstate.total_value,"totalVAlaueeeeeeeeeeeeeee")}
                        <TableCell component="th" scope="row">
                          <TextField  
                            value={PopUpstate.total_value}
                            name="total_value"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                            inputProps={{
                             // maxLength:200
                             }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>
            <Button
              variant="contained"
              style={{ margin: "20px" }}
              alignRight="true"
              onClick={UpdatePopUpSubmitData}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              style={{ margin: "20px" }}
          alignRight="true"
              onClick={handleUpdateModelClose}
            >
              Cancel
            </Button>
          </Container>
        </Page>
      </Box>
    </Modal>
    
    <Container maxWidth="lg">
    <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                      <Grid xs={12} style={{ display: "flex", justifyContent: "space-between" }}>
                          <HeaderBreadcrumbs
                              heading='Experience'
                              links={[
                                  { name: 'Dashboard', href: "/dashboard/app" },
                                  { name: 'Experience' }
                              ]}
                          />
                          <Button variant="contained" style={{ margin: "50px" }} alignRight="true" onClick={handleOpen}>Add Experience</Button>
                      </Grid>
                  </Grid>

              </Box>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
                    <TableBody>
                      {state &&  state.map((ele,i)=>(
                          <TableRow key={ele.id}>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={ele.tittle}
                            name="tittle"
                            style={{ width: "100%" }}
                            inputProps={
                              { readOnly: true, }
                          }
                          //   onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={ele.description}
                            name="description"
                            style={{ width: "100%" }}
                            inputProps={
                              { readOnly: true, }
                          }
                          //   onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {console.log(ele,"eleeeeeeeeeeeeeeeeeeeeeeeeee")}
                          <TextField
                            value={ele.total_value}
                            name="total_value"
                            style={{ width: "100%" }}
                            inputProps={
                              { readOnly: true, }
                          }
                          //   onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => openhandleUpdateModel(ele)}
                          >
                            <Edit />
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => openhandleDeleteModel(ele)}
                          >
                            
                            <Delete />
                          </Button>
                        </TableCell>
                      </TableRow>
                      ))}
                      
                    </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Container>
  </Page>
    )
}
