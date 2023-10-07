import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
    Card, Table, Stack, Avatar, Button, Checkbox, TableRow, TableBody, TableCell, Container, Typography, TableContainer, TablePagination, Modal, Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import { GetUserListAction } from '../../redux/actions/UsersAction';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email Address', alignRight: false },
    { id: 'phoneNumber', label: 'Phone Number', alignRight: false },
    { id: 'designation', label: 'Designation', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'action', label: 'Action', alignRight: true }
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


export default function SubAdminList() {
    const dispatch = useDispatch();

    const USERLISTNew = useSelector(state => state.users.user_list.data)
    const USERLIST = USERLISTNew !== undefined && USERLISTNew.data

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const addUserModalOpen = () => {

    }

    useEffect(() => {
        dispatch(GetUserListAction())
    }, [])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
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
        if (event.target.checked) {
            const newSelecteds = USERLIST.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
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
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    // function createData(
    //     name: string,
    //     calories: number,
    //     fat: number,
    //     carbs: number,
    //     protein: number,
    // ) {
    //     return { name, calories, fat, carbs, protein };
    // }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    // ];

    return (
        <Page title="User">
            <Container maxWidth="lg">
                <HeaderBreadcrumbs
                    heading="Sub Admin List"
                    links={[
                        { name: 'Dashboard', href: "/dashboard/app" },
                        { name: 'Sub Admin'}
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to="/dashboard/sub-admin/create"
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New User
                        </Button>
                    }
                />

                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={USERLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell padding="checkbox"> <Checkbox checked="" onChange={(event) => handleClick(event)} /> </TableCell>
                                            <TableCell component="th" scope="row" padding="none"> John Smith </TableCell>
                                            <TableCell align="left"> johnSmith@yopmail.com </TableCell>
                                            <TableCell align="left"> 9987654324 </TableCell>
                                            <TableCell align="left"> designation</TableCell>
                                            <TableCell align="left">
                                                <Label variant="ghost" color="success">
                                                    Verified
                                                </Label>
                                            </TableCell>
                                            <TableCell align="right"> <UserMoreMenu /> </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                </Card>
            </Container>
        </Page>
    );
}
