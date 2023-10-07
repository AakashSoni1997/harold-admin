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
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { apiHeader } from "src/redux/actions/ApiHeader";
import { baseUrlPostGres } from "src/redux/constant";
import { toast } from "react-toastify";
import { getHomePage } from "src/redux/actions/PageActions";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { CKEditor } from "ckeditor4-react";
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_image", label: "Title", alignRight: false },
  { id: "c_id", label: "Field", alignRight: false },
];
export const Homepagebanner = (props) => {
  const dispatch = useDispatch();
  const ContactCMSListData = useSelector(
    (state) => state.Page?.page_list?.data?.success,
  );
  const [state, setState] = useState({});
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  useEffect(() => {
    dispatch(getHomePage(props.url));
  }, [props.name]);

  console.log(state, "ContactCMSListDatafsdfsdfs");

  useEffect(() => {
    console.log(
      ContactCMSListData,
      "ContactCMSListDataContactCMSListDataContactCMSListData",
    );
    if (ContactCMSListData && ContactCMSListData.length > 0) {
      setState(ContactCMSListData[0]);
    }
  }, [ContactCMSListData]);

  const stateHandler = (key, value) => {
    state[key] = value;
    setState({ ...state });
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
      if (name === "image" || name === "icon" || name === "video") {
        var file = e.target.files[0];
        setState({ ...state, [name]: file });
        getBase64(file, name);
      } else {
        setState({ ...state, [name]: value });
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
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const SubmitData = async () => {
    let formData = new FormData();
    formData.append("id", ContactCMSListData[0]?.id);
    formData.append("description", state.description);
    formData.append("page_name", state.page_name);
    formData.append("image", state.image);
    formData.append("head_line", state.head_line);
    await axios
      .post(`${baseUrlPostGres()}/api/page-common-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("Content update successfully");
        console.log(
          "jgiofjgjgfdgfgfdgGetUpcomingMatchListAction Response is",
          response.data.success[0].image,
        );
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
  };
  console.log(InputImagestate, "InputImagestateeeeeeeeeeeeeeeeee");

  return (
    <Page title="User">
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid xs={10}>
              <HeaderBreadcrumbs
                heading={`${props.name} CMS`}
                links={[
                  { name: "Dashboard", href: "/dashboard/app" },
                  { name: "Banner Page" },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <UserListHead headLabel={TABLE_HEAD} />
              {ContactCMSListData && (
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      1
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Banner vedio
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        className="file-upload-btn"
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
                            <video
                              alt=""
                              src={
                                InputImagestate.image != null
                                  ? InputImagestate.image
                                  : `${baseUrlPostGres()}/${state.image}`
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
                      2
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Banner Heading
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        value={state.page_name}
                        name="page_name"
                        style={{ width: "100%" }}
                        inputProps={
                          {
                            // maxLength: 300,
                          }
                        }
                        ContactCMSListData
                        onChange={handleChange}
                        // inputProps={{
                        //    // maxLength: 11,
                        // }}
                      />
                    </TableCell>
                  </TableRow>

                  {props.name === "HOME" && (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        3
                      </TableCell>
                      <TableCell component="th" scope="row">
                        Heading
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TextField
                          value={state.head_line}
                          name="head_line"
                          style={{ width: "100%" }}
                          inputProps={
                            {
                              // maxLength: 300,
                            }
                          }
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {props.name === "HOME" ? 4 : 3}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Description
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {state.description && (
                        <div className="App">
                          {console.log(
                            state.description,
                            "state.descriptionstate.descriptionstate.description",
                          )}
                          <CKEditor
                            name="description"
                            initData={state.description}
                            // data={state.description}
                            onChange={handleChange}
                          />
                        </div>
                      )}
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
          onClick={SubmitData}
        >
          Submit
        </Button>
      </Container>
    </Page>
  );
};
