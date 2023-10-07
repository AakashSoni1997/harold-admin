import React, { useState, useEffect } from 'react';
// material
import {
    Card, Divider, Table, Button, Checkbox, TableRow, TableBody, TableCell, TextField, Container, Typography, TableContainer, TablePagination, Modal, TableSortLabel,
} from '@mui/material';
// components
import Page from 'src/components/Page';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useDispatch, useSelector } from 'react-redux';
import { getHomePage } from 'src/redux/actions/PageActions';
import axios from 'axios';
import { apiHeader } from 'src/redux/actions/ApiHeader';
import { baseUrlPostGres } from 'src/redux/constant';
import BaneerPart from 'src/pages/home page/common/Bannerpart';
import HomeSecondSection from 'src/pages/home page/common/homeSecondSection';
import Box from '@mui/material/Box';
import { CKEditor } from 'ckeditor4-react';
import ContractVehicles from 'src/pages/homepage/ContractVehicles';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
export default function CmsHome(props) {
    const dispatch = useDispatch()
    const ContactCMSListData = useSelector(state => state.Page)

    const [state, setState] = useState({
        id: "",
        image: "",
        icon: '',
        poc: "",
        email: "",
        phone: "",
        address: ""
    })
    const [InputImagestate, setInputImageState] = useState({
        image: null,
        icon: null,
    })


    useEffect(() => {
        dispatch(getHomePage("home"))
    }, [])



    function getBase64(file, name) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(setInputImageState({ ...InputImagestate, [name]: reader.result }));
            reader.onerror = error => reject(error);
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "image" || name === "icon") {
            var file = e.target.files[0]
            setState({ ...state, [name]: file })
            getBase64(file, name);
        }
        else {
            setState({ ...state, [name]: value })
        }
    }

    return (
        <Page title="User">
            <Container maxWidth="lg">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid xs={10}>
                            <HeaderBreadcrumbs
                                heading="Home CMS"
                                links={[
                                    { name: 'Dashboard', href: "/dashboard/app" },
                                    { name: 'HomeCMS' }
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Page>
    );
}
