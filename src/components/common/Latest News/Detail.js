import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
    ButtonGroup,
    FormGroup,
    FormInput,
    FormTextarea,
    Alert,
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import APIError from "../../components/common/APIError";
import Loader from "../../components/Loader/Loader";
import { Redirect } from "react-router-dom";
import { APIService } from "./../../utils/APIService";
import userLoginStatus from "./../../utils/userLoginStatus";

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this._dismissAlert = this._dismissAlert.bind(this);
        this.state = {
            loginStatus: undefined,
            loading: false,
            listItems: false,
            internetConnected: true,
            visible: false,
            id: this.props.match.params.id,
            data: {},
        };

        /* alert(JSON.stringify(this.props.location.state, null, 2)); */

        this._handleChange = this._handleChange.bind(this);
        this._handleSendMessage = this._handleSendMessage.bind(this);
    }

    componentDidMount() {
        if (this.state.loginStatus === undefined) {
            userLoginStatus().then(
                (value) => {
                    this._fetchDetail();
                },
                (reason) => {
                    this.setState({ loginStatus: false });
                }
            );
        }
    }

    _fetchDetail = () => {
        let { id } = this.state;
        APIService.fetchUserDetails(id).then(
            (data) => {
                this.setState({
                    loginStatus: true,
                    loading: false,
                    data,
                });
            },
            (error) => {
                this.setState({
                    loading: false,
                    errorMessage:
                        error.errorMessage ||
                        "Cannot connect to server. Either there's a problem with your internet connection or the server is down.",
                    errorCode: error.errorStatus || "NOT CONNECTED",
                    url: "",
                });
            }
        );
    };

    _dismissAlert() {
        this.setState({ visible: false });
    }

    _handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    _handleSendMessage = () => {
        this.setState({
            loading: true,
        });
        const { title, message, id } = this.state;
        const user_id = id;
        APIService.sendMessage({ title, message, user_id, send_pn: true }).then(
            (success) => {
                this.setState({
                    loading: false,
                    title: "",
                    message: "",
                    messageSendingStatus: "Successful",
                });
            },
            (failure) => {
                alert(failure.errorMessage);
                this.setState({
                    loading: false,
                    messageSendingStatus: "Failed",
                });
            }
        );
    };

    renderUserAgents(data) {
        return (
            <>
                <CardHeader className="border-bottom">
                    <Row>
                        <Col>
                            <h6 className="m-0">Agents</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        Action ID
                                    </th>
                                    <th scope="col" className="border-0">
                                        User Agent
                                    </th>
                                    <th scope="col" className="border-0">
                                        Created At
                                    </th>
                                    <th scope="col" className="border-0">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!data.user_agents
                                    ? data.user_agents.map((Obj, i) => (
                                        <tr key={i}>
                                            <td>{!!Obj.action_id ? Obj.action_id : "null"}</td>
                                            <td>{Obj.user_agent}</td>
                                            <td>{Obj.created_at}</td>
                                            <td>{Obj.action_type}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="15" className="text-center noRec-found"> No record found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </>
        );
    }
    renderUserDetails() {
        const { data } = this.state;
        return (
            <>
                <Container>
                    <h4 color="green">{data.name ? data.name : "NA"}</h4>
                    <br />
                    {data.phone} | {data.email ? data.email : "Email not present."}
                    <br />
                    {data.otp_expire_at ? "OTP not entered" : "Registration Successful"}
                    <br />
                    Created: {new Date(data.created_at).toString()}
                    <br />
                    Updated: {new Date(data.updated_at).toString()}
                </Container>
            </>
        );
    }

    renderUserAddresses(data) {
        return (
            <>
                <CardHeader className="border-bottom">
                    <Row>
                        <Col>
                            <h6 className="m-0">Addresses</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        ID
                                    </th>
                                    <th scope="col" className="border-0">
                                        Name
                                    </th>
                                    <th scope="col" className="border-0">
                                        Address Line 1
                                    </th>
                                    <th scope="col" className="border-0">
                                        Address Line 2
                                    </th>
                                    <th scope="col" className="border-0">
                                        City
                                    </th>
                                    <th scope="col" className="border-0">
                                        State
                                    </th>
                                    <th scope="col" className="border-0">
                                        PinCode
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!data.user_addresses
                                    ? data.user_addresses.map((Obj, i) => (
                                        <tr key={i}>
                                            <td>{Obj.id}</td>
                                            <td>{Obj.name}</td>
                                            <td>{Obj.address_line1}</td>
                                            <td>{Obj.address_line2}</td>
                                            <td>{Obj.city}</td>
                                            <td>{Obj.state}</td>
                                            <td>{Obj.zip}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="15" className="text-center noRec-found"> No record found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </>
        );
    }

    Notifications(data) {
        return (
            <>
                <CardHeader className="border-bottom">
                    <Row>
                        <Col>
                            <h6 className="m-0">Notifications</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        ID
                                    </th>
                                    <th scope="col" className="border-0">
                                        Mode
                                    </th>
                                    <th scope="col" className="border-0">
                                        Title
                                    </th>
                                    <th scope="col" className="border-0">
                                        Message
                                    </th>
                                    <th scope="col" className="border-0">
                                        Sent At
                                    </th>
                                    <th scope="col" className="border-0">
                                        Read
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!data.notifications
                                    ? data.notifications.map((Obj, i) => (
                                        <tr key={i}>
                                            <td>{Obj.id}</td>
                                            <td>{Obj.type}</td>
                                            <td>{Obj.title}</td>
                                            <td>{Obj.message}</td>
                                            <td>{Obj.created_at}</td>
                                            <td>{Obj.is_unread ? "False" : "True"}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="15" className="text-center noRec-found"> No record found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </>
        );
    }
    renderUserDevices(data) {
        return (
            <>
                <CardHeader className="border-bottom">
                    <Row>
                        <Col>
                            <h6 className="m-0">Devices</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        ID
                                    </th>
                                    <th scope="col" className="border-0">
                                        platform
                                    </th>
                                    <th scope="col" className="border-0">
                                        Updated At
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!data.user_devices
                                    ? data.user_devices.map((Obj, i) => (
                                        <tr key={i}>
                                            <td>{Obj.id}</td>
                                            <td>{Obj.platform}</td>
                                            <td>{Obj.created_at}</td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="15" className="text-center noRec-found"> No record found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </>
        );
    }

    renderOrders(data) {
        return (
            <>
                <CardHeader className="border-bottom">
                    <Row>
                        <Col>
                            <h6 className="m-0">Orders</h6>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody className="p-0 pb-3">
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead className="bg-light">
                                <tr>
                                    <th scope="col" className="border-0">
                                        Order #
                                    </th>
                                    <th scope="col" className="border-0">
                                        Subtotal
                                    </th>
                                    <th scope="col" className="border-0">
                                        Discount
                                    </th>
                                    <th scope="col" className="border-0">
                                        Delivery Charge
                                    </th>
                                    <th scope="col" className="border-0">
                                        Receipt Total
                                    </th>
                                    <th scope="col" className="border-0">
                                        Order Status
                                    </th>
                                    <th scope="col" className="border-0">
                                        First Order?
                                    </th>
                                    <th scope="col" className="border-0" align="right" />
                                </tr>
                            </thead>
                            <tbody>
                                {!!data.orders
                                    ? data.orders.map((Obj, i) => (
                                        <tr key={i}>
                                            <td>{Obj.id}</td>
                                            <td>{Obj.subtotal}</td>
                                            <td>{Obj.discount}</td>
                                            <td>{Obj.delivery_charge}</td>
                                            <td>{Obj.receipt_total}</td>
                                            <td>
                                                {Obj.status.charAt(0).toUpperCase() +
                                                    Obj.status.slice(1)}
                                            </td>
                                            <td>{Obj.is_first_order ? "True" : "False"}</td>
                                            <td align="right">
                                                <ButtonGroup size="sm">
                                                    <Button
                                                        theme="secondary"
                                                        onClick={() =>
                                                            this.setState({
                                                                redirect: true,
                                                                redirectPath: "/orders/" + Obj.id + "/detail",
                                                                redirectData: { id: Obj.id },
                                                            })
                                                        }
                                                    >
                                                        Details
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <tr>
                                        <td colSpan="15" className="text-center noRec-found"> No record found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </>
        );
    }

    render() {
        const {
            loginStatus,
            loading,
            messageSendingStatus,
            message,
            title,
            errorMessage,
            errorCode,
            data,
        } = this.state;

        if (this.state.redirect) {
            return (
                <Redirect
                    to={{
                        pathname: this.state.redirectPath,
                        state: this.state.redirectData,
                    }}
                />
            );
        }
        if (errorMessage && errorCode) {
            return <APIError code={errorCode}>{errorMessage}</APIError>;
        }
        if (loading || loginStatus === undefined) {
            return <Loader />;
        } else if (loginStatus) {
            return (
                <>
                    <Alert
                        theme={this.state.alertStyle || "primary"}
                        dismissible={this._dismissAlert}
                        open={this.state.visible}
                        className="mb-0"
                    >
                        <i className={this.state.alertIcon} /> {this.state.alertMessage}
                    </Alert>
                    <Container fluid className="main-content-container px-4">
                        <Row>
                            <Col>
                                <Row noGutters className="page-header py-4">
                                    <Col>
                                        <PageTitle
                                            sm="4"
                                            title="Users"
                                            subtitle="Ornat"
                                            className="text-sm-left"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="text-md-right" sm="4" xs="12">
                                <Row noGutters className="page-header py-4">
                                    <Col>
                                        <Button
                                            outline
                                            theme="primary"
                                            className="mb-2 mr-1"
                                            onClick={() => {
                                                this.setState({
                                                    redirect: true,
                                                    redirectPath: "/users",
                                                });
                                            }}
                                        >
                                            Back
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="8" className="mb-4">
                                <Card small className="mb-4">
                                    {this.renderOrders(data)}
                                </Card>
                                <Card small className="mb-4">
                                    {this.renderUserAddresses(data)}
                                </Card>
                                <Card small className="mb-4">
                                    {this.renderUserAgents(data)}
                                </Card>
                                <Card small className="mb-4">
                                    {this.Notifications(data)}
                                </Card>
                            </Col>
                            <Col lg="4" className="mb-4">
                                <Card small className="mb-4 p-2">
                                    {this.renderUserDetails()}
                                </Card>
                                <Card small className="mb-4">
                                    <CardHeader className="border-bottom">
                                        <h6 className="m-0">Send Message</h6>
                                    </CardHeader>
                                    <CardBody className="p-0 pb-3">
                                        <Container style={{ padding: 20 }}>
                                            {messageSendingStatus}
                                            <FormGroup>
                                                <FormInput
                                                    id="title"
                                                    placeholder="Title"
                                                    name="title"
                                                    value={title}
                                                    onChange={this._handleChange}
                                                />
                                                <FormTextarea
                                                    id="Message"
                                                    placeholder="Start typing your message here..."
                                                    name="message"
                                                    value={message}
                                                    onChange={this._handleChange}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Button
                                                    theme="primary"
                                                    className="mb-2 mr-1"
                                                    onClick={this._handleSendMessage}
                                                >
                                                    Send Message
                                                </Button>
                                            </FormGroup>
                                        </Container>
                                    </CardBody>
                                </Card>
                                <Card small className="mb-4">
                                    {this.renderUserDevices(data)}
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            );
        } else {
            return <Redirect to="/login" />;
        }
    }
}

export default UserDetail;
