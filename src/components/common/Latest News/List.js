import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/common/loader";
import PopUp from "../../components/Popup/PopUpGrade";
import {
  listgradeAction,
  gradeCategoryAction,
  addgradeAction,
  deletegradeAction,
  showGradeAction,
  updateGradeAction
} from "../../flux/Action/GradeAction";
import { FormInput, FormSelect } from "shards-react";
import GradeListRow from "../../components/common/ListRow/GradeListRow";
import { Store } from "../../flux";
import { useHistory } from "react-router-dom";
import PaginatedItems from "../../components/pagination";

const GradeList = () => {
  //api response
  const [gradeList, setGradeList] = useState([]);
  const [gradeDetails, setGradeDetails] = useState([]);
  const [gradeCategory, setgradeCategory] = useState([]);
  const [gradeCategoryIcons, setgradeCategoryIcons] = useState("Upload Icon");
  //state for toggle and toggle data
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  //onchange data
  const [GradeCategoryid, setGradeCategoryid] = useState();
  const [GradeCategoryName, setGradeCategoryName] = useState();
  const [GradeImage, setGradeImage] = useState();
  const [DeletedGradeName, setDeletedGradeName] = useState();
  //pagination state
  const [currentPage, setcurrentPage] = useState(1);
  // const [postsPerPage, setpostsPerPage] = useState(10);
  const [currentPosts, setcurrentPosts] = useState();

  const history = useHistory();

  useEffect(() => {
    //data add to store for edit grade

    setGradeCategoryid(gradeDetails.grade_category_id);
    setGradeCategoryName(gradeDetails.grade_name);
    console.log("loglogloglog", gradeDetails);
    setgradeCategoryIcons(gradeDetails.icon)
    //grade list action

    let formData = new FormData();
    formData.append("page_no", currentPage);
    listgradeAction(formData);

    //add change listenerfor geting data from flux

    Store.addChangeListener(onChange);
    Store.addChangeListener(onAddgrade);

    return () => {
      Store.removeChangeListener(onChange);
      Store.removeChangeListener(onAddgrade);
    };
  }, [isLoading, gradeDetails, currentPage]);

  const onChange = () => {
    setGradeList(Store.gradeList().data.data.grades);
    setcurrentPosts(Store.gradeList().data.data.tot_grades);
  };

  const onAddgrade = () => {
    console.log("Store.gradeCategory().data.data.data", Store.gradeCategory().data.data);
    Store.gradeCategory().data && setgradeCategory(Store.gradeCategory().data.data);
  };

  const onShowgrade = () => {
    setGradeDetails(Store.ShowGrade().data.data);
  };

  const sendGrade = (grade_id, grade_category_name) => {
    history.push({
      pathname: `/subjects/` + grade_id,
      state: {
        update: grade_category_name,
        grade_id: grade_id
      }
    });
  };

  const addgrade = () => {
    gradeCategoryAction();
    setOpen(true);
  };

  const updateGrade = async id => {
    Store.addChangeListener(onShowgrade);
    let formData = new FormData();
    formData.append("grade_id", id);
    await showGradeAction({ formData });
    await gradeCategoryAction();
    setisOpen(!isOpen);
  };

  const callGradeapi = () => {
    let formData = new FormData();
    formData.append("grade_category_id", GradeCategoryid);
    formData.append("grade_name", GradeCategoryName);
    formData.append("icon", gradeCategoryIcons);
    addgradeAction({ formData });
    setOpen(!open);
    setGradeCategoryName("");
    setGradeCategoryid("");
  };

  const callUpdateapi = () => {
    let formData = new FormData();
    formData.append("grade_category_id", GradeCategoryid);
    formData.append("grade_name", GradeCategoryName);
    formData.append("grade_id", gradeDetails.id);
    formData.append("icon", gradeCategoryIcons);
    updateGradeAction({ formData });
    setisOpen(!isOpen);
    setGradeCategoryName("");
    setGradeCategoryid("");
  };

  const hideModal = () => {
    setOpen(!open);
    setGradeCategoryName("");
    setGradeCategoryid("");
    setgradeCategory([]);
  };

  const HideModal = () => {
    setisOpen(!isOpen);
    setGradeCategoryName("");
    setGradeCategoryid("");
    setgradeCategory([]);
  };

  const HideModals = () => {
    setisDeleteOpen(!isDeleteOpen);
  };

  const body = () => {
    return (
      <>
        <Container>
          <select
            className="mb-2 form-control"
            onChange={e => {
              setGradeCategoryid(e.target.value);
            }}
          >
            <option>Select Level</option>
            {console.log(gradeCategoryIcons, "gradeCategoryIcons")}
            {gradeCategory.map((obj, i) => {
              return (
                <>
                  <option value={obj.id} key={i}>
                    {obj.category_name}
                  </option>
                </>
              );
            })}
          </select>
          <input
            size="sm"
            type="text"
            placeholder="Grades/Classes"
            className="mb-2 form-control"
            onChange={e => {
              setGradeCategoryName(e.target.value);
            }}
          />
          <label for="img" className="mb-2" >Upload Image</label>
          <input type="file" name="uploadfile" id="img" className="mb-2 form-control"

            onChange={e => {
              setgradeCategoryIcons(e.target.files[0])
            }}
            accept="image/*"
          />
        </Container>
      </>
    );
  };

  const popUpbody = gradeCategory.length ? body() : <Loader />;

  const body1 = () => {
    let result = [];
    for (const element of gradeCategory) {
      if (element.category_name === gradeDetails.grade_category_name) {
        result.unshift(element);
      } else {
        result.push(element);
      }
    }
    return (
      <>
        <Container>
          <select
            className="mb-2 form-control"
            onChange={e => {
              setGradeCategoryid(e.target.value);
            }}
          >
            {result.map((obj, i) => {
              return (
                <>
                  <option value={obj.id} key={i}>
                    {obj.category_name}
                  </option>
                </>
              );
            })}
          </select>
          <FormInput
            value={
              GradeCategoryName ? GradeCategoryName : null
            }
            size="sm"
            type="text"
            placeholder="Grades/Classes"
            className="mb-2"
            onChange={e => {
              setGradeCategoryName(e.target.value);
            }}
          />
          <label for="img" className="mb-2" >Upload Image</label>
          <input type="file" name="uploadfile" id="img" className="mb-2 form-control"
            value={gradeCategoryIcons}
            // file={GradeImage ? GradeImage : null}
            onChange={e => {
              setgradeCategoryIcons(e.target.files[0])
            }}
            accept="image/*"
          />
        </Container>
      </>
    );
  };
  const popShowbody = gradeCategory.length ? body1() : <Loader />;

  const body2 = () => {
    return (
      <>
        <div>Are you sure you want to delete this Grade?</div>
      </>
    );
  };

  const popDeletebody = body2();

  const HandlePageClick = data => {
    setcurrentPage(data.selected + 1);
  };

  const deleteGrade = () => {
    let formData = new FormData();
    formData.append("grade_id", DeletedGradeName);
    deletegradeAction({ formData });
    setisDeleteOpen(!isDeleteOpen);
  };

  const deleteGradePopUp = id => {
    setisDeleteOpen(!isDeleteOpen);
    setDeletedGradeName(id);
  };
  return (
    <>
      <Container fluid className="main-content-container">
        <PageHeader
          title={"Grades"}
          subtitle={"MsingiPACK"}
          name={"Add grade"}
          onsubmit={addgrade}
          Status={true}
        />
        <PopUp
          title={"Add Grade"}
          open={open}
          hideModal={hideModal}
          body={popUpbody}
          callApi={callGradeapi}
          showButton={true}
        />
        <PopUp
          title={"Update Grade"}
          open={isOpen}
          hideModal={HideModal}
          body={popShowbody}
          callApi={callUpdateapi}
          showButton={true}
        />
        <PopUp
          title={"Delete Grade"}
          open={isDeleteOpen}
          hideModal={HideModals}
          body={popDeletebody}
          callApi={deleteGrade}
          showButton={true}
          ButtonNmae={"Delete"}
        />
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Grades</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" className="border-0">
                          S.No
                        </th>
                        <th scope="col" className="border-0">
                          Grade Category Name
                        </th>
                        <th scope="col" className="border-0">
                          Grade / Classes
                        </th>
                        <th scope="col" className="border-0">
                          Icon
                        </th>
                        <th
                          scope="col"
                          className="border-0"
                          style={{ textAlign: "center" }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <GradeListRow
                      currentPosts={gradeList}
                      sendGrade={sendGrade}
                      title={" View Subject"}
                      deleteGrade={deleteGradePopUp}
                      updateGrade={updateGrade}
                      pageNo={currentPage}
                    />
                    {console.log(gradeCategoryIcons, "gradeCategoryIcons")}
                  </table>
                  {currentPosts > 10 &&
                    <PaginatedItems
                      List={currentPosts}
                      HandlePageClick={HandlePageClick}
                    />}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default GradeList;
