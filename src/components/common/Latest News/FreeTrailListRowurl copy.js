import React, { useEffect, useState } from "react";
import { Button, Container, FormInput } from "shards-react";
import PopUp from "../../Popup/PopUpGrade";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../loader";
import api from "../../../api";
import HandleError from "../../../utils/HandleError";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { localeData } from "moment";
import PageHeader from "../../PageHeader";
import { Beforeunload, useBeforeunload } from 'react-beforeunload';
export const FreeTrailListRowurlcopy = ({
    listData,
    setReloadList,
    ReloadList,
    sendSubject,
    title,
    deleteSubject,
    updateSubject,
    pageNo,
    setPaymentStatus,
    PaymentStatus,
    setshowButtons,
    setshowReloadButtons
}) => {
    const history = useHistory();
    // delete free trails content
    const [isdeletepopup, setisdeletepopup] = useState(false);
    const [UserId, setUserId] = useState([])
    // update free trial content
    const [updateContent, setUpdateContent] = useState(false)
    // const [openPopup, setopenPopup] = useState(false)
    const [contentData, setContentData] = useState()
    const [error, setError] = useState("")
    const OpenDeletePopup = (id) => {
        setisdeletepopup(true)
        setUserId(id)
    }

    const HideDelteModals = () => {
        setisdeletepopup(false)
        setUserId()
    }
    const body1 = () => {
        return (
            <>
                <Container>
                    Are you sure you want to delete this content
                </Container>
            </>
        );
    };
    const popChangebody1 = body1();

    const callDeleteApi = () => {
        var token = JSON.parse(Cookies.get("auth"));
        setisdeletepopup(false)
        setshowReloadButtons(true)
        axios({
            url: api.baseURL + `/free_trial/${UserId}`,
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: "BEARER " + token.data.token
            },
        })
            .then(res => {
                if (res.data.status === "success") {
                    console.log("DFGFDGFDGDFGDFGDF");
                    setshowReloadButtons(false)
                    setReloadList(!ReloadList)
                    // setLoading(false)
                    // setPaymentStatus(!PaymentStatus)
                    toast.success(res.data.message)
                }
            })
            .catch(error => {
                // setLoading(false)
                HandleError(error);
            });
    }

    // view content button
    const sendGrade = (content_id) => {
        history.push({
            pathname: `/free-trail-content-view/` + content_id,
        });
    };

    // update
    const OpenUpdatePopup = (data) => {
        setContentData({ ...contentData, subjectName: data.title })
        setUpdateContent(true)
        setUserId(data.id)
    }

    const HideUpdatePopup = () => {
        setUpdateContent(false)
        setUserId()
    }

    const updatepopUpFunction = () => {
        return (
            <>
                <Container>
                    <>
                        <p size="sm" className="mb-1 text-danger" value={error}>{error}</p>
                        <FormInput
                            size="sm"
                            type="text"
                            placeholder="Subject Name"
                            className="mb-2"
                            value={contentData && contentData.subjectName}
                            onChange={e => {
                                setContentData({ ...contentData, "subjectName": e.target.value });
                            }}
                        />
                        <FormInput type="file" accept=".zip" onChange={(e) => {
                            setContentData({ ...contentData, "Pdf": e.target.files[0] });
                            // setpdfValidate(false)
                        }} />
                    </>
                </Container>
            </>
        );
    };
    const updatepopUpbody = updatepopUpFunction();


    const AddContentApi = () => {
        if (contentData && contentData.subjectName) {
            let formData = new FormData();
            if (contentData && contentData.Pdf) {
                formData.append("content", contentData.Pdf);
            }
            formData.append("title", contentData.subjectName);
            setError("")
            setUpdateContent(false)
            setshowReloadButtons(true)
            setUserId()
            var token = JSON.parse(Cookies.get("auth"));
            axios({
                url: api.baseURL + `/free_trial_update/${UserId}`,
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    Authorization: "BEARER " + token.data.token
                },
                data: formData
            })
                .then(res => {
                    if (res.data.status == "success") {
                        console.log("fsdfbshcdfgs", res.data.status);
                        setshowReloadButtons(false)
                        setReloadList(!ReloadList)
                        toast.success(res.data.message)
                    } if (res.data.status === "error") {
                        setshowButtons(false)
                    }
                })
                .catch(error => {
                    // setshowButtons(false)
                    HandleError(error);
                });
        }
        else {
            setError("All fields are required*")
        }
    }

    return (
        <>

            <PopUp
                title={"Delete Free Trial Content"}
                open={isdeletepopup}
                hideModal={HideDelteModals}
                body={popChangebody1}
                callApi={callDeleteApi}
                showButton={true}
                ButtonNmae={"Yes"}
            />
            <PopUp
                title={"Upload Free Trial Content"}
                open={updateContent}
                hideModal={HideUpdatePopup}
                body={updatepopUpbody}
                callApi={AddContentApi}
                showButton={true}
                ButtonNmae={"Yes"}
            />

            {listData.map((Obj, i) => {
                return (
                    <>
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td style={{ textAlign: "center" }}>{Obj.title}</td>
                            <td style={{ textAlign: "center" }}>{Obj.content_url ? Obj.content_url : <img className="Header-logo" src="/progressloader.gif" style={{ width: "10%" }} alt="Logo" />}</td>
                            <td style={{ textAlign: "center" }}>
                                <Button
                                    className="action-btn"
                                    title="View"
                                    onClick={() => {
                                        Obj.content_url && sendGrade(Obj.id)
                                    }}
                                    disabled={!Obj.content_url ? "disabled" : ""}
                                >
                                    <i class="material-icons">
                                        visibility
                                    </i>
                                </Button>

                                &nbsp;
                                <Button
                                    className="action-btn"
                                    theme="danger"
                                    title="Delete"
                                    onClick={() => OpenDeletePopup(Obj.id)}
                                    disabled={UserId == Obj.id ? "disabled" : ""}
                                >
                                    <i class="material-icons">
                                        delete
                                    </i>
                                </Button>
                                &nbsp;
                                <Button
                                    className="action-btn"
                                    theme="info"
                                    title="Edit"
                                    onClick={() => OpenUpdatePopup(Obj)}
                                >
                                    <i class="material-icons">
                                        edit
                                    </i>
                                </Button>
                            </td>

                        </tr>
                    </>
                )
            })

            }
        </>
    )
}

