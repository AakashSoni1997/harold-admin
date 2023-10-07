import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material
import {
    Card, TextField, Divider, Table, Stack, Avatar, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination, Modal, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MatchChangeStatusAction } from '../../redux/actions/MatchAction';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
// import Stack from '@mui/material/Stack';
import usePagination from "../../components/Pagination";
// ----------------------------------------------------------------------

const TABLE_HEAD = [

    { id: 'c_no', label: 'Sr no.', alignRight: false },
    { id: 'c_image', label: 'Image', alignRight: false },
    { id: 'c_id', label: 'Id', alignRight: false },
    { id: 'c_title', label: 'Title', alignRight: false },
    { id: 'c_subtitle', label: 'Subtitle', alignRight: false },
    { id: 'c_bonus', label: 'Bonus Deduction(%)', alignRight: false },
    // { id: 'status', label: 'Status', alignRight: false },
    { id: 'c_upinfo', label: 'Update Info', alignRight: false },
    { id: 'c_action', label: 'Actions', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}





export default function UpcomingMatches(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const selectorData = useSelector(state => state)
    console.log("Selector data is", selectorData)
    const ContestListData = useSelector(state => state.matches.upcoming_match_list.data)
    console.log("UserList data is contest", ContestListData)
    const ContestList = ContestListData !== undefined && ContestListData.data.match_list
    console.log("UserList List is", ContestList)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [state, setState] = useState({
        ContestListData: [],
        totalCountContestList: 0,
        logoImg: [],
        title: '',
        subtitle: '',
        dis_val: ''
    })

    console.log("state is", state.logoImg[0]?.name)

    useEffect(() => {
        if (ContestListData !== undefined) {
            setState({ ...state, ContestListData: ContestListData.data.match_list, totalCountContestList: ContestListData.data.total_count })
        }

    }, [ContestListData])


    useEffect(() => {
    }, [page, rowsPerPage])


    useEffect(() => {
    }, [selectorData.matches.match_status])



    useEffect(() => {
        if (selectorData.contests.contest_add.message == "Contest created successfully.!!!") {
            setOpen(false)
        }
    }, [selectorData.contests.contest_add])

    const style = {

        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40%",
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        console.log("New page is", newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        console.log("parseInt(event.target.value, 10)", parseInt(event.target.value, 10))
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };


    const applySortFilter = (array, comparator, query) => {
        const stabilizedThis = array && array.map((el, index) => [el, index]);
        if (stabilizedThis) {
            stabilizedThis.sort((a, b) => {
                const order = comparator(a[0], b[0]);
                if (order !== 0) return order;
                return a[1] - b[1];
            });
        }
        if (query) {
            console.log("array 12", array[0].first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
            console.log("array 1555", query)
            return filter(array, (_user) => _user.first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
        }
        const filterData = stabilizedThis && stabilizedThis.map((el) => el[0])
        return filterData;
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ContestList.length) : 0;

    const filteredUsers = applySortFilter(ContestList, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;


    const submitContestFormData = (e) => {
        e.preventDefault()
        console.log("state.logoImg[0]", state.logoImg[0])
        let formData = new FormData();
        formData.append("title", state.title);
        formData.append("subtitle", state.subtitle);
        formData.append("dis_val", state.dis_val);
        formData.append("contestlogo", state.logoImg[0])

    }


    const activateMatch = (event, is_active, match_id) => {
        event.preventDefault()
        let sendData = {
            match_id: match_id,
            is_active: is_active
        }
        console.log("Send data is ", sendData)

        dispatch(MatchChangeStatusAction(sendData))

        console.log("active")
    }

    const InactivateMatch = (event, is_active, match_id) => {
        event.preventDefault()
        let sendData = {
            match_id: match_id,
            is_active: is_active
        }
        dispatch(MatchChangeStatusAction(sendData))
        console.log("active")
    }

    return (
        <Page title="User">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Divider />
                    <TextField
                        onChange={({ target }) =>
                            stateHandler("title", target.value)
                        }
                        value={state.title}
                        style={{ marginTop: 20, width: "100%" }} id="outlined-basic" label="Title" variant="outlined" />

                    <TextField
                        onChange={({ target }) =>
                            stateHandler("subtitle", target.value)
                        }
                        value={state.subtitle}
                        style={{ marginTop: 20, width: "100%" }} id="outlined-basic" label="Subtitle" variant="outlined" />
                    <TextField
                        onChange={({ target }) =>
                            stateHandler("dis_val", target.value)
                        }
                        value={state.dis_val}
                        style={{ marginTop: 20, width: "100%" }} id="outlined-basic" label="Discount Value (%)" variant="outlined" />

                    <Grid container spacing={2}>
                        <Grid xs={8}>
                            <Button variant="contained" component="label" style={{ marginTop: 20, }}>
                                Upload Logo
                                <input hidden onChange={({ target }) =>
                                    stateHandler("logoImg", target.files)
                                } accept="image/*" multiple type="file" />
                            </Button>
                        </Grid>
                        <Grid xs={4}>
                            <Typography style={{ marginTop: 20, }} variant="button" display="block" gutterBottom>
                                {state.logoImg[0]?.name}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button align={"center"} style={{ marginTop: 20, width: "100%" }} onClick={(e) => submitContestFormData(e)} variant="contained">Add Contest</Button>

                </Box>
            </Modal>
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={10}>
                            <HeaderBreadcrumbs
                                heading="Upcoming Contest List"
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'UpcomingContestList' }
                                ]}
                            />
                        </Grid>

                    </Grid>
                </Box>

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={state.totalCountContestList}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {state.ContestListData.map((data, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell padding="checkbox"> <Checkbox checked="" onChange={(event) => handleClick(event)} /> </TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> {page * rowsPerPage +
                                                (index + 1)}</TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> John</TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> {data.match_id}</TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> {data.title}</TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> {data.subtitle}</TableCell>
                                            <TableCell component="th" scope="row" padding="none" align="center"> {5}</TableCell>

                                            <TableCell component="th" scope="row" padding="none"> {data.updatedAt}</TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {data.is_active === 1 ? <Button size="small" color="success" onClick={(event) => activateMatch(event, 0, data.match_id)}>Active</Button> : <Button size="small" color="error" onClick={(event) => InactivateMatch(event, 1, data.match_id)}>Inactive</Button>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={state.totalCountContestList}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
