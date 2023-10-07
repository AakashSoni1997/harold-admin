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
import { GetLogisticsCapabilitiesList, UpdateLogisticsCapabilities } from "src/redux/actions/LogisticsAction";
import { baseUrlPostGres } from "src/redux/constant";
import { GetFMSAnalysisList, UpdateFMSAnalysis } from "src/redux/actions/FMSActions";

const TABLE_HEAD = [
  { id: "c_no", label: "Sr no.", alignRight: false },
  { id: "c_title", label: "Title", alignRight: false },
  { id: "c_id", label: "Field", alignRight: false },
];

export const FMSAnalysis = (props) => {
  const [state, setState] = useState({});
  const [InputImagestate, setInputImageState] = useState({
    image: null,
    icon: null,
  });

  const dispatch = useDispatch();

  const FMSAnalysisData = useSelector(
    (state) => state.fms?.fms_analysis_list?.success,
  );

  const updateData=useSelector(
    (state) => state.fms?.fms_analysis_update?.success,
  );



  useEffect(() => {
    if (FMSAnalysisData && FMSAnalysisData.length > 0) {
      setState(FMSAnalysisData[0]);
    }
  }, [FMSAnalysisData]);

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
    dispatch(GetFMSAnalysisList());
  }, [dispatch,updateData]);



const handleChange = (e) => {
  // console.log(state, "e.target.value");
  if (e.target) {
      var { name, value } = e.target;
          setState({ ...state, [name]: value })
  }
  else {
      var name = e.editor.name;
      var value = e.editor.getData()
      if (name === "content_description" || name === "description" || name == "codes") {
          // state[name] = value
          const name = e.editor.name;
          console.log({ e, name }, "e.target.value");
          const value = e.editor.getData()
          // setState({ ...state, })
          setState((prevState) => ({
              ...prevState,
              [name]: value
          }));
      }
  }
}

const SubmitData = async () => {
  let formData={
    id:FMSAnalysisData[0]?.id,
    tittle:state.tittle,
    description:state.description
  }
dispatch(UpdateFMSAnalysis(formData))
};
console.log(FMSAnalysisData,"FMSAnalysisData");

return (
  <Page title="User">
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <HeaderBreadcrumbs
              heading={`${props.name} CMS`}
              links={[
                { name: "Dashboard", href: "/dashboard" },
                { name: "Capabilities" },
              ]}
            />
          </Grid>
        </Grid>
      </Box>
      <Scrollbar>
        {state.description !== undefined &&  <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead headLabel={TABLE_HEAD} />
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  1
                </TableCell>
                <TableCell component="th" scope="row">
                  Title
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    value={state.tittle}
                    name="tittle"
                    style={{ width: "100%" }}
                    inputProps={{
                     // maxLength: 300,
                    }}
                    onChange={handleChange}
                    // inputProps={{
                    //    // maxLength: 11,
                    // }}
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
        </TableContainer>}
     
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
}
