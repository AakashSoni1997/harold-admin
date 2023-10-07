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
import { Edit } from "@mui/icons-material";
import {
  GetFMSSliderCapabilitiesList,
  UpdateFMSSliderCapabilities,
} from "src/redux/actions/FMSActions";
import {
  GetServicesTechnologyList,
  UpdateServicesTechnologyList,
} from "src/redux/actions/ServicesActions";

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_title", label: "Title", alignRight: false },
  { id: "c_description", label: "Description", alignRight: false },
  { id: "c_action", label: "Action", alignRight: false },
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


export const ServicesITSupportSection = () => {

  const dispatch = useDispatch();
  const [state, setState] = useState([]);
  const [updateModelopen, setupdateModelopen] = useState("");
  const [Error, setError] = useState("");
  const [PopUpstate, setPopUpstate] = useState({});
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  const servicesTechnology = useSelector(
    (state) => state.services?.services_technology_list?.success,
  );
  const updateData = useSelector(
    (state) => state.services?.services_technology_update,
  );

  useEffect(() => {
    setState(servicesTechnology);
  }, [servicesTechnology]);

  useEffect(() => {
    dispatch(GetServicesTechnologyList());
  }, [dispatch, updateData]);

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
    formData.append("video", PopUpstate.video);
    formData.append("tittle", PopUpstate.tittle);
    setupdateModelopen(false);
    dispatch(UpdateServicesTechnologyList(formData));
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
    // console.log(state, "e.target.value");
    if (e.target) {
      var { name, value } = e.target;
      console.log({ e, name }, "e.target.value");
      if (name === "video" || name === "icon") {
        var file = e.target.files[0];
        setPopUpstate({ ...PopUpstate, [name]: file });
        getBase64(file, name);
      } else {
        setPopUpstate({ ...PopUpstate, [name]: value });
      }
    } else {
      var name = e.editor.name;
      var value = e.editor.getData();
      if (
        name === "content_description" ||
        name === "description" ||
        name == "codes"
      ) {
        const name = e.editor.name;
        console.log({ e, name }, "e.target.value");
        const value = e.editor.getData();
        setPopUpstate((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const openhandleUpdateModel = (ele) => {
    setPopUpstate(ele);
    handleUpdateModelOpen(true);
  };

  const handleClose = () => {
    setupdateModelopen(false);
    setInputImageState({});
  };


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
                  <UserListHead headLabel={POPUP_TABLE_HEAD} />
                  {console.log(
                    PopUpstate,
                    "PopUpstateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
                  )}
                  {PopUpstate && (
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Video
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <TextField
                          helperText="* Please upload .mp4 *"
                            className="file-upload-btn"
                            type="file"
                            name="video"
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
                                <video
                                  src={
                                    InputImagestate.video != null
                                      ? InputImagestate.video
                                      : PopUpstate.video !== null
                                      ? `${baseUrlPostGres()}/${
                                          PopUpstate.video
                                        }`
                                      : ""
                                  }
                                  width="450"
                                  height="300"
                                  controls
                                />
                              ),
                            }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Heading
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={PopUpstate.tittle}
                            name="tittle"
                            inputProps={{
                            // maxLength: 300,
                            }}
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          2
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          Description
                        </TableCell>
                        <TableCell component="th" scope="row">
                      <CKEditor 
                      name="description"
                      initData={PopUpstate.description}
                      // data={state.description}
                      onChange={handleChange}
                      />
                          {/* <TextField
                            value={PopUpstate.description}
                            name="description"
                            inputProps={{
                            // maxLength: 300,
                            }}
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          /> */}
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
              onClick={handleClose}
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
          <Grid
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <HeaderBreadcrumbs
              heading="INFORMATION TECHNOLOGY SUPPORT CMS"
              links={[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Information Technology Support" },
              ]}
            />
          </Grid>
        </Grid>
      </Box>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            {state &&
              state.map((ele, i) => {
                return (
                  <>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {i + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={ele.tittle}
                            name="tittle"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          
                          <TextField
                            value={ele.description}
                            name="description"
                            style={{ width: "100%" }}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {/* <Button >C</Button> */}
                          <Button 
                           variant="contained"
                           color="success"
                          onClick={() => openhandleUpdateModel(ele)}>
                            <Edit />
                          </Button>
                          {/* <Button onClick={() => openhandleDeleteModel(ele)} >D</Button> */}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                );
              })}
          </Table>
        </TableContainer>
      </Scrollbar>
    </Container>
  </Page>
  )
}
