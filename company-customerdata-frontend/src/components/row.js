import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Rows extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rowData: this.props.row,
            open: false
        }
    }

    render() {
        const { rowData, open } = this.state;
        return (
            <React.Fragment>
                <TableRow style={{backgroundColor: "#D0D3D4"}}>
                    <TableCell component="th" scope="row">
                        {rowData.company_name}
                    </TableCell>
                    <TableCell align="center">{rowData.order_count}</TableCell>
                    <TableCell align="right">{rowData.order_sum}</TableCell>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setState({ open: !this.state.open })}>
                            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Summary
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">First Name</TableCell>
                                            <TableCell align="left">Last Name</TableCell>
                                            <TableCell align="center">Number of Orders</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rowData.details.map((detailRow) => (
                                            <TableRow>
                                                <TableCell component="th" scope="row" align="left">
                                                    {detailRow.first_name}
                                                </TableCell>
                                                <TableCell align="left">{detailRow.last_name}</TableCell>
                                                <TableCell align="center">{detailRow.order_count}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

}

export default Rows;