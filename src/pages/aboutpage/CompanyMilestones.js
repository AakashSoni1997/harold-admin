import React, { useState, useEffect } from "react";
// material
import {
  Card,
  Divider,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TextField,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  TableSortLabel,
  Grid,
  TextareaAutosize,
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
import { Delete, Edit } from "@mui/icons-material";
import { CKEditor } from "ckeditor4-react";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_id", label: "Milestone Year", alignRight: false },
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

export default function CompanyMilestones(props) {
  const [state, setState] = useState();
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });
  const [PopUpstate, setPopUpstate] = useState({});

  //open mode
  const [open, setopen] = useState("");

  const handleClose = () => {
    setopen(false);
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
    formData.append("original_image", PopUpstate.original_image);
    formData.append("thumbnail_image", PopUpstate.thumbnail_image);
    formData.append("milestones_year", PopUpstate.milestones_year);
    setupdateModelopen(false);
    await axios
      .put(`${baseUrlPostGres()}/api/about-milestones-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        listCalling();
        toast("Content Added successfully");
      })
      .catch((errors) => {
        console.log("user list error", errors);
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
      .get(`${baseUrlPostGres()}/api/about-milestones-list`, {
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
    // console.log(PopUpstate, "e.target.value");
    if (e.target) {
        var { name, value } = e.target;
        console.log({ e, name }, "e.target.value");
        if (name === "image" || name === "icon" || name === "original_image" || name==="thumbnail_image") {
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

  const ADDPopUpSubmitData = async () => {
    console.log("gldfjgljfdklgjdgdf", PopUpstate);
    if (
      PopUpstate?.description &&
      PopUpstate?.original_image &&
      PopUpstate?.thumbnail_image &&
      PopUpstate?.milestones_year
    ) {
      let formData = new FormData();
      setError("");
      setPopUpstate({});
      setInputImageState("");
      formData.append("description", PopUpstate.description);
      formData.append("original_image", PopUpstate.original_image);
      formData.append("thumbnail_image", PopUpstate.thumbnail_image);
      formData.append("milestones_year", PopUpstate.milestones_year);
      setopen(false);
      for (const keys of formData.values()) {
          console.log(keys,"keyssssssssssssssssssssssssssssssssssssssssss");
      }
      await axios
        .post(`${baseUrlPostGres()}/api/about-milestones-add`, formData, {
          headers: apiHeader(),
        })
        .then((response) => {
          listCalling();
          toast("Content Added successfully");
        })
        .catch((errors) => {
          console.log("user list error", errors);
        });
    } else {
      setError("All fields are required*");
    }
  };

  const openhandleDeleteModel = async (ele) => {
    let formData = new FormData();
    formData.append("description", ele.id);
    setopen(false);
    await axios
      .delete(`${baseUrlPostGres()}/api/about-milestones-delete/${ele.id}`, {
        headers: apiHeader(),
      })
      .then((response) => {
        listCalling();
        toast("content deleted successfully");
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
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
                <TableContainer sx={{ minWidth: 800 }}>
              <Scrollbar>
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
                              name="original_image"
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
                                      InputImagestate.original_image != null &&
                                      InputImagestate.original_image
                                    }
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
                            Thumbnail
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="file"
                              accept="video/*"
                              name="thumbnail_image"
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
                                      InputImagestate.thumbnail_image != null &&
                                      InputImagestate.thumbnail_image
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
                            Year
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={state.milestones_year}
                              inputProps={{
                               // maxLength: 300,
                              }}
                              name="milestones_year"
                              style={{ width: "100%" }}
                              onChange={handleChange}
                              type="number"
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
                          <div className="App">
                              <TextareaAutosize
                              style={{width:"100%"}}
                                name="description"
                                value={state.description}
                                // data={state.first_description}
                                onChange={handleChange}
                              />
                            </div>
                            {/* <TextField
                              value={state.description}
                              name="description"
                              inputProps={{
                               // maxLength: 300,
                              }}
                              onChange={handleChange}
                              style={{ width: "100%" }}
                            /> */}
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
              </Scrollbar>
                </TableContainer>
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
                            Image
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="file"
                              accept="video/*"
                              name="original_image"
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
                                      InputImagestate.original_image != null
                                        ? InputImagestate.original_image
                                        : `${baseUrlPostGres()}/${
                                            PopUpstate.original_image
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
                            1
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Thumbnail Image
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              type="file"
                              accept="video/*"
                              name="thumbnail_image"
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
                                      InputImagestate.thumbnail_image != null
                                        ? InputImagestate.thumbnail_image
                                        : `${baseUrlPostGres()}/${
                                            PopUpstate.thumbnail_image
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
                            Year
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={PopUpstate.milestones_year}
                              name="milestones_year"
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
                            3
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Description
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <div className="App">
                              <h2>Description</h2>
                              <TextareaAutosize
                              style={{width:"100%"}}
                                name="description"
                                value={PopUpstate.description}
                                // data={state.first_description}
                                onChange={handleChange}
                              />
                            </div>
                            {/* <TextField
                              value={PopUpstate.description}
                              name="description"
                              inputProps={{
                               // maxLength: 300,
                              }}
                              onChange={handleChange}
                              style={{ width: "100%" }}
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
            <Grid
              xs={12}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <HeaderBreadcrumbs
                heading="Company Milestones"
                links={[
                  { name: "Dashboard", href: "/dashboard/app" },
                  { name: "Company Milestones" },
                ]}
              />
              <Button
                variant="contained"
                style={{ margin: "50px" }}
                alignRight="true"
                onClick={handleOpen}
              >
                Add Milestones
              </Button>
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
                              value={ele.milestones_year}
                              name="milestones_year"
                              style={{ width: "100%" }}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={ele.description}
                              name="page_name"
                              style={{ width: "100%" }}
                              onChange={handleChange}
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
