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
// import { CKEditor } from "ckeditor4-react";
import {
  GetFMSSpaceList,
  UpdateFMSSpace,
} from "src/redux/actions/FMSActions";
import { baseUrlPostGres } from "src/redux/constant";
import { useState } from "react";
import { useEffect } from "react";
import {  Edit } from "@mui/icons-material";

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_title", label: "Title", alignRight: false },
  { id: "c_description", label: "Description", alignRight: false },
  { id: "c_action", label: "Action", alignRight: false },

];

const POPUP_TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_title", label: "Title", alignRight: false },
  { id: "c_description", label: "Description", alignRight: false },
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

export const FMSSpace = () => {
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
    const [value, setValue] = useState(1);
  
    const spaceList = useSelector(
      (state) => state.fms?.fms_space_list?.success
    );

    const updateData = useSelector((state) => state.fms?.fms_space_update);
  
    useEffect(() => {
      setState(spaceList);
    }, [spaceList]);
  
  
    useEffect(() => {
      dispatch(GetFMSSpaceList(value));
    }, [dispatch,value,updateData]);
  
  
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
      setupdateModelopen(false);
      dispatch(UpdateFMSSpace(formData));
    };
  
    function getBase64(file, name) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          resolve(
            setInputImageState({ ...InputImagestate, [name]: reader.result })
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
  
  
    const openhandleUpdateModel = (ele) => {
      setPopUpstate(ele);
      handleUpdateModelOpen(true);
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
                            inputProps={{
                             // maxLength: 900,
                            }}
                            name="description"
                            onChange={handleChange}
                            style={{ width: "100%" }}
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
              heading="Experience"
              links={[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Experience" },
              ]}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              {spaceList &&
                spaceList.map((ele, i) => (
                  <TableRow key={ele.id}>
                    <TableCell component="th" scope="row">
                      {i + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        value={ele.tittle}
                        name="page_name"
                        style={{ width: "100%" }}
                        inputProps={{ readOnly: true }}
                        //   onChange={handleChange}
                      />
                    </TableCell>
                    <TableCell>
                    <TextField
                            value={ele.description}
                            // id="outlined-multiline-static"
                            // multiline
                            // rows={10}
                            // variant="outlined"
                            inputProps={{
                             // maxLength: 900,
                            }}
                            name="description"
                            onChange={handleChange}
                            style={{ width: "100%" }}
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
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
      </Box>
    </Container>
  </Page>
  )
}
