import React, { useState, useEffect } from "react";
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
  TablePagination,
  Modal,
  Box,
  TableSortLabel,
  Grid,
  CardMedia,
  CardActionArea,
} from "@mui/material";
// components
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import { UserListHead } from "src/sections/@dashboard/user";
import axios from "axios";
import { apiHeader } from "src/redux/actions/ApiHeader";
import { baseUrlPostGres } from "src/redux/constant";
import { toast } from "react-toastify";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { CKEditor } from "ckeditor4-react";
import { Edit } from "@mui/icons-material";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_id", label: "Heading", alignRight: false },
  { id: "c_id", label: "Description", alignRight: false },
  { id: "c_id", label: "Action", alignRight: false },
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

export default function Conversion() {
  const [state, setState] = useState();
  const [InputImagestate, setInputImageState] = useState({
    video: null,
    icon: null,
  });
  const [PopUpstate, setPopUpstate] = useState({});

  //open mode
  const [open, setopen] = useState("");

  const handleClose = () => {
    setupdateModelopen(false);
    setInputImageState({});
  };

  const handleOpen = () => {
    setopen(true);
  };

  const [Error, setError] = useState("");

  const [updateModelopen, setupdateModelopen] = useState("");

  // const [updateModeldata, setupdateModeldata] = useState()

  const handleUpdateModelClose = () => {
    setInputImageState({});
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
    formData.append("video", PopUpstate.video);
    formData.append("description", PopUpstate.description);
    formData.append("tittle", PopUpstate.tittle);
    setupdateModelopen(false);
    await axios
      .put(`${baseUrlPostGres()}/api/training-conversion-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        listCalling();
        toast("Content Added successfully");
      })
      .catch((errors) => {
        const error =
          errors &&
          errors.response &&
          errors.response.data &&
          errors.response.data.success;
        console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", error);
        toast(error);
      });
    // }
  };

  const openhandleUpdateModel = (ele) => {
    setPopUpstate(ele);
    handleUpdateModelOpen(true);
  };


  useEffect(() => {
    listCalling();
  }, []);

  const listCalling = () => {
    axios
      .get(`${baseUrlPostGres()}/api/training-conversion-list`, {
        headers: apiHeader(),
      })
      .then((response) => {
        console.log("GetUpcomingMatchListAction Response is", response);
        setState(response.data.success);
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
  };

  console.log(state, "ContactCMSListDatafsdfsdfs");

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
    console.log(PopUpstate, "e.target.value");
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
      if (name === "content_description" || name == "codes") {
        // PopUpstate[name] = value
        const name = e.editor.name;
        console.log({ e, name }, "e.target.value");
        const value = e.editor.getData();
        // setPopUpstate({ ...PopUpstate, })
        setPopUpstate((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
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
                            <TextField
                              value={PopUpstate.description}
                              name="description"
                              inputProps={{
                              // maxLength: 700,
                              }}
                              style={{ width: "100%" }}
                              onChange={handleChange}
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
                heading="Conversion CMS"
                links={[
                  { name: "Dashboard", href: "/dashboard/app" },
                  { name: "Conversion" },
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
  );
}
