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
import { Edit } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { LogoutAction } from "src/redux/actions/AuthAction";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_id", label: "Heading", alignRight: false },
  { id: "c_id", label: "Image", alignRight: false },
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
  maxHeight: "100vh",
  overflow: "scroll",
};

export default function OurMission() {
  const dispatch = useDispatch();

  const [state, setState] = useState();
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });
  const [PopUpstate, setPopUpstate] = useState();

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
    // formData.append("description", PopUpstate.description);
    formData.append("image", PopUpstate.image);
    formData.append("tittle", PopUpstate.tittle);
    setupdateModelopen(false);
    await axios
      .put(`${baseUrlPostGres()}/api/about-mission-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
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
      .get(`${baseUrlPostGres()}/api/about-mission-list`, {
        headers: apiHeader(),
      })
      .then((response) => {
        if (response.data.message === "Unauthorized please login again!") {
          dispatch(LogoutAction(response.data.message));
        }
        console.log("GetUpcomingMatchListAction Response is", response);
        setState(response.data.success);
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
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
      var file = e.target.files[0];
      setPopUpstate({ ...PopUpstate, [name]: file });
      getBase64(file, name);
    } else {
      setPopUpstate({ ...PopUpstate, [name]: value });
    }
  };

  const ADDPopUpSubmitData = async () => {
    if (PopUpstate?.description && PopUpstate?.image && PopUpstate?.head_line) {
      let formData = new FormData();
      setError("");
      setPopUpstate({});
      setInputImageState("");
      formData.append("description", PopUpstate.description);
      formData.append("image", PopUpstate.image);
      formData.append("head_line", PopUpstate.head_line);
      setopen(false);
      await axios
        .post(`${baseUrlPostGres()}/api/letest-add-news`, formData, {
          headers: apiHeader(),
        })
        .then((response) => {
          if (response.data.message === "Unauthorized please login again!") {
            dispatch(LogoutAction(response.data.message));
          }
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
                            Heading
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={state.head_line}
                              inputProps={
                                {
                                  // maxLength: 300,
                                }
                              }
                              name="head_line"
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
                              inputProps={
                                {
                                  // maxLength: 300,
                                }
                              }
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
                        {PopUpstate.id === 1 || PopUpstate.id === 4 || (
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
                                value={`${baseUrlPostGres()}/${
                                  PopUpstate.image
                                }`}
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
                        )}

                        {console.log("fdfhskdjfsdfsdfs", InputImagestate.image)}
                        <TableRow>
                          <TableCell component="th" scope="row">
                            2
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Heading
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <TextField
                              value={PopUpstate.tittle}
                              name="tittle"
                              inputProps={
                                {
                                  // maxLength: 300,
                                }
                              }
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
                heading="Our-Mission"
                links={[
                  { name: "Dashboard", href: "/dashboard/app" },
                  { name: "Our-Mission" },
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
                              name="page_name"
                              style={{ width: "100%" }}
                              onChange={handleChange}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                          {ele.id === 1 || ele.id === 4 || (
                              <TextField
                                value={ele.image}
                                name="image"
                                style={{ width: "100%" }}
                                onChange={handleChange}
                              />
                          )}
                            </TableCell>
                          <TableCell component="th" scope="row">
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => openhandleUpdateModel(ele)}
                            >
                              <Edit />
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
