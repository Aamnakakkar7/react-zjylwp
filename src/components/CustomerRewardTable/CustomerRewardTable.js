import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants } from '../../utils/constants';
import React from 'react';
import calculateRewardPointsByThreshold from '../../utils/calculateRewardPointsThreshold';
import './CustomerRewardTable.css';

const CustomerRewardTable = (({receivedData}) => {
    const extractYear = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    }
    return (
        <div>
            <TableContainer component = {Paper}>
                {Object.entries(receivedData).map(([filterationKey, items]) => (
                    <React.Fragment key={filterationKey}>
                        <h3>{filterationKey}</h3>
                        <Table className="reward-table" sx={{ maxHeight: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="table-row">
                                    <TableCell>{constants.ID_OF_CUSTOMER}</TableCell>
                                    <TableCell>{constants.CUSTOMER_NAME}</TableCell>
                                    <TableCell>{constants.ID_OF_PURCHASE}</TableCell>
                                    <TableCell>{constants.AMOUNT}</TableCell>
                                    <TableCell>{constants.DATE_OF_PURCHASE}</TableCell>
                                    <TableCell>{constants.YEAR_OF_PURCHASE}</TableCell>
                                    <TableCell>{constants.POINTS}</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item) => (
                                    <TableRow key={item.purchaseId}>
                                        <TableCell>{item.customerId}</TableCell>
                                        <TableCell>{item.customerName}</TableCell>
                                        <TableCell>{item.purchaseId}</TableCell>
                                        <TableCell>{item.amount}</TableCell>
                                        <TableCell>{item.purchaseDate}</TableCell>
                                        <TableCell>{extractYear(item.purchaseDate)}</TableCell>
                                        <TableCell>{calculateRewardPointsByThreshold(item.amount)}</TableCell>
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

export default CustomerRewardTable;