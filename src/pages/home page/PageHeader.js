import { Button, Grid, TableRow, TableCell, TextField } from '@mui/material';
import React, { useState } from "react";

const PageHeader = ({ title, subtitle, name, onsubmit, Status }) => {
    const [status, setStatus] = useState(Status);
    return (
        <Grid noGutters className="page-header py-4 align-items-center">
            <Grid md="8" sm="7" className="pl-md-0">
            </Grid>

            {status == true && (
                <Grid md="4" sm="5" className="text-right">
                    <Button
                        outline
                        // theme="primary"
                        className="mr-1"
                        onClick={() => {
                            onsubmit();
                        }}
                    >
                        fsdfsd
                    </Button>

                </Grid>
            )}
        </Grid>
    );
};

export default PageHeader;
