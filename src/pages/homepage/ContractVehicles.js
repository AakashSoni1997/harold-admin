import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";
import { baseUrlPostGres } from "src/redux/constant";
import { apiHeader } from "src/redux/actions/ApiHeader";
import { toast } from "react-toastify";
import { CKEditor } from "ckeditor4-react";
import {
  Button,
  Table,
  TableRow,
  TableCell,
  Grid,
  TextField,
  Container,
} from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";

export default function ContractVehicles() {
  const [value, setValue] = React.useState("1");
  const [slug, setSlug] = React.useState("page-common/training");
  const [state, setState] = useState();
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    console.log(event, "eventeventevent");
    setSlug(event.target.name);
  };

  useEffect(() => {
    axios
      .get(`${baseUrlPostGres()}/api/home-contract`, {
        headers: apiHeader(),
      })
      .then((response) => {
        console.log("GetUpcomingMatchListAction Response is", response);
        setState(response.data.success[0]);
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
  }, []);

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
  const handleChange1 = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image" || name === "icon") {
      var file = e.target.files[0];
      setState({ ...state, [name]: file });
      getBase64(file, name);
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleChange = (e) => {
    const name = e.editor.name;
    console.log(e.editor, e.target, "e.target.value");
    const value = e.editor.getData();
    if (
      name === "content_description" ||
      name === "description" ||
      name == "codes"
    ) {
      state[name] = value;
    }
    if (name === "image" || name === "icon") {
      var file = e.target.files[0];
      setState({ ...state, [name]: file });
      getBase64(file, name);
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const SubmitData = async () => {
    let slugvariable = "page-common-update";
    if (slug == "home-foreign-list") {
      slugvariable = "home-foreign-update";
    }
    let formData = new FormData();
    formData.append("id", state.id);
    // formData.append("image", state.image);
    formData.append("icon", state.icon);
    formData.append("content_description", state.content_description);
    formData.append("description", state.description);
    formData.append("codes", state.codes);
    formData.append("tittle", state.tittle);
    await axios
      .post(`${baseUrlPostGres()}/api/contract-update`, formData, {
        headers: apiHeader(),
      })
      .then((response) => {
        toast("Content upload successfully");
        console.log(
          "jgiofjgjgfdgfgfdgGetUpcomingMatchListAction Response is",
          response.data.success[0].image,
        );
      })
      .catch((errors) => {
        console.log("user list error", errors);
      });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ width: "100%", typography: "body1" }}>
        <Grid container spacing={2}>
          <Grid
            xs={12}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <HeaderBreadcrumbs
              heading="Contract Vehicles"
              links={[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Contract Vehicles" },
              ]}
            />
          </Grid>
        </Grid>
        <Table>
          {state && (
            <>
              <TableRow>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell component="th" scope="row">
                  Heading
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    value={state.tittle}
                    name="tittle"
                    onChange={handleChange1}
                    style={{ width: "100%" }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  2
                </TableCell>
                <TableCell component="th" scope="row">
                  Icon
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    type="file"
                    name="icon"
                    accept="image/*"
                    onChange={handleChange1}
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
                            InputImagestate.icon != null
                              ? InputImagestate.icon
                              : `${baseUrlPostGres()}/${state.icon}`
                          }
                        />
                      ),
                    }}
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
                  <CKEditor
                    initData={state.description}
                    onInstanceReady={() => {}}
                    name="description"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  4
                </TableCell>
                <TableCell component="th" scope="row">
                Content Description
                </TableCell>
                <TableCell component="th" scope="row">
                  <CKEditor
                    initData={state.content_description}
                    name="content_description"
                    onInstanceReady={() => {}}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  5
                </TableCell>
                <TableCell component="th" scope="row">
                Codes
                </TableCell>
                <TableCell component="th" scope="row">
                  <CKEditor
                    name="codes"
                    initData={state.codes}
                    data={state.codes}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </>
          )}

        </Table>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Button
                variant="contained"
                style={{ margin: "20px", width: "100px" }}
                onClick={SubmitData}
            >
                Submit
            </Button>
          </div>
      </Box>
    </Container>
  );
}
