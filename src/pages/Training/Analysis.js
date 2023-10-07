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

export default function Analysis() {
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
      .get(`${baseUrlPostGres()}/api/training-analysis-list`, {
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
  const handleChange = (e) => {
    // console.log(PopUpstate, "e.target.value");
    if (e.target) {
      var { name, value } = e.target;
      console.log({ e, name }, "e.target.value");
      if (name === "image" || name === "icon") {
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
        name === "left_section" ||name === "description" || name == "codes"
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
    let sendData = {
      id: state.id,
      tittle: state.tittle,
      description: state.description,
      left_section: state.left_section,
    };

    console.log(sendData, "sedndataaaaaaaaaaaaaaaaaaaaaaaaa");
    // let slugvariable = "page-common-update"
    // if (slug == "home-foreign-list") {
    //     slugvariable = "home-foreign-update"
    // }
    // let formData = new FormData();
    // formData.append("id", state.id);
    // formData.append("tittle", state.tittle);
    // formData.append("description", state.description);
    // formData.append("left_section", state.left_section);
    await axios
      .put(
        `${baseUrlPostGres()}/api/training-analysis-update`,
        JSON.stringify(sendData),
        {
          headers: apiHeader(),
        },
      )
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
              heading="Analysis Section"
              links={[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Analysis Section" },
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
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  2
                </TableCell>
                <TableCell component="th" scope="row">
                  Left Section
                </TableCell>
                <TableCell component="th" scope="row">
                  <CKEditor
                    initData={state.left_section}
                    onInstanceReady={() => {}}
                    name="left_section"
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
                  <CKEditor
                    initData={state.description}
                    onInstanceReady={() => {}}
                    name="description"
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            </>
          )}
        </Table>
        <Button
          variant="contained"
          style={{ margin: "20px" }}
          alignRight="true"
          onClick={SubmitData}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
