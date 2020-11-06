import React, { Component } from 'react';
import axios from 'axios';
import Row from './row';
import { Card,Table,TableBody, TableCell, TableContainer,TableHead,TableRow, IconButton , TableFooter, CircularProgress} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Paper from '@material-ui/core/Paper';

class Records extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 1,
            total: 1,
            tabledata: [],
            loading:true,
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`http://localhost:8000/api/?page=` + this.state.page)
            .then(res => {
                const data = res.data;
                this.setState({
                    tabledata: data.data,
                    total: data.total,
                    loading: false
                });
            })
    }

    reducePage = (page) => {
        if (page === 1) {
            return null
        }
        else {
            let temp_page = page - 1
            this.setState({ page: temp_page }, () => this.getData())
        }

    }

    increasePage = (page) => {
        if (page === this.state.total) {
            return null
        }
        else {
            let temp_page = page + 1
            this.setState({ page: temp_page }, () => this.getData())
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1 > Comapny Records </h1>
                </div>
                <Card style={{margin:"80px"}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow style={{backgroundColor: "#E67E22"}}>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell align="center">Number of Orders</TableCell>
                                    <TableCell align="right">Order Total</TableCell>
                                    <TableCell />
                                </TableRow>
                            </TableHead>
                            <TableBody style={{backgroundColor: "#F0F3F4"}}>
                                 {this.state.loading ?  <CircularProgress color="secondary" align="center" /> :
                                this.state.tabledata.map((row) => (
                                    <Row key={row.company_name} row={row} />
                                ))}
                            </TableBody>
                            <TableFooter style={{ marginTop: "50px", align: "right" }}>
                                <div style={{float:"right"}}>
                                <IconButton aria-label="expand row" size="small" onClick={() => this.reducePage(this.state.page)}>
                                    <ChevronLeftIcon />
                                </IconButton>
                                {this.state.page} / {this.state.total}
                                <IconButton aria-label="expand row" size="small" onClick={() => this.increasePage(this.state.page)}>
                                    <ChevronRightIcon />
                                </IconButton>
                                </div>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Card>
            </div>
        );
    }
}

export default Records;