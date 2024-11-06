import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants } from '../../utils/constants';
import React from 'react';
import './MonthlyRewardTable.css';

const MonthlyRewardTable = (({receivedData}) => {
    return (
        <div>
            <TableContainer component = {Paper}>
                {Object.keys(receivedData).map((filterKey) => (
                    <React.Fragment key={filterKey}>
                        <h3>{filterKey}</h3>
                        <Table className="reward-table" sx={{ maxHeight: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="table-row">
                                    <TableCell>{constants.ID_OF_CUSTOMER}</TableCell>
                                    <TableCell>{constants.CUSTOMER_NAME}</TableCell>
                                    <TableCell>{constants.POINTS}</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.values(receivedData[filterKey]).map((customer) => (
                                    <TableRow key={customer.customerId}>
                                        <TableCell>{customer.customerId}</TableCell>
                                        <TableCell>{customer.customerName}</TableCell>
                                        <TableCell>{customer.totalRewards}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </React.Fragment>
                ))}
            </TableContainer>
        </div>
    );
});

export default MonthlyRewardTable;