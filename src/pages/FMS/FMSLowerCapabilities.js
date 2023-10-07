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
  Box,
  Grid,
} from "@mui/material";
// components
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import { UserListHead } from "src/sections/@dashboard/user";
import { useDispatch, useSelector } from "react-redux";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { CKEditor } from "ckeditor4-react";
import {
  GetFMSCapabilitiesList,
  UpdateFMSCapabilities,
} from "src/redux/actions/FMSActions";
import { baseUrlPostGres } from "src/redux/constant";

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_image", label: "Title", alignRight: false },
  { id: "c_id", label: "Field", alignRight: false },
];
const FMSLowerCapabilities = (props) => {
  const FMSCapabilitiesData = useSelector(
    (state) => state.fms?.fms_lowercapabilities_list?.success,
  );

  const updateData=useSelector((state)=>state.fms.fms_lowercapabilities_update);
  console.log(updateData,"updateData");

  const [state, setState] = useState({});
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (FMSCapabilitiesData && FMSCapabilitiesData.length > 0) {
      setState(FMSCapabilitiesData[0]);
    }
  }, [FMSCapabilitiesData]);

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

  useEffect(() => {
    dispatch(GetFMSCapabilitiesList());
  }, [dispatch,updateData]);

  const handleChange = (e) => {
    // console.log(state, "e.target.value");
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
        name === "content_description" ||
        name === "description" ||
        name == "codes"
      ) {
        // state[name] = value
        const name = e.editor.name;
        console.log({ e, name }, "e.target.value");
        const value = e.editor.getData();
        // setState({ ...state, })
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    }
  };

  const SubmitData = async () => {
    let formData = new FormData();
    formData.append("id", FMSCapabilitiesData[0]?.id);
    formData.append("image", state.image);
    formData.append("head_line", state.head_line);
    formData.append("description", state.description);
    console.log(state, "stateeeeeeeeeeeeee");
    dispatch(UpdateFMSCapabilities(formData));
  };
  console.log(FMSCapabilitiesData, "FMSCapabilitiesData");

  return (
    <Page title="User">
      <Container maxWidth="lg">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <HeaderBreadcrumbs
                heading={`${props.name} CMS`}
                links={[
                  { name: "Dashboard", href: "/dashboard/app" },
                  { name: "Capabilities" },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
        <Scrollbar>
          {state.description !== undefined && (
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      1
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Head Line
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        value={state.head_line}
                        name="head_line"
                        style={{ width: "100%" }}
                        inputProps={{
                        // maxLength: 300,
                        }}
                        onChange={handleChange}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      2
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Banner Image
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <TextField
                        className="file-upload-btn"
                        type="file"
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
                              src={
                                InputImagestate.image !== null
                                  ? InputImagestate.image
                                  : `${baseUrlPostGres()}/${state.image}`
                              }
                              alt=""
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
                      List Item
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <div className="App">
                        <CKEditor
                          name="description"
                          initData={state.description}
                          // data={state.description}
                          onChange={handleChange}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>
        <Button
          variant="contained"
          style={{ margin: "20px" }}
          onClick={SubmitData}
        >
          Submit
        </Button>
      </Container>
    </Page>
  );
};

export default FMSLowerCapabilities;
