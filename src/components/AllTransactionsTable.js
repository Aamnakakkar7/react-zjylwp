import React from 'react';
import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants, calculatePointsPerTransaction } from '../utils';
import '../style.css';
import PropTypes from 'prop-types';


const AllTransactionsTable = ((purchaseData) => {
    return (
        <div>
            <h3 className='total-transactions'>{constants.ALL_TRANSACTIONS}</h3>
            <TableContainer component = {Paper}>
                {Object.entries(purchaseData).map(([index, items]) => (
                    <React.Fragment key={index}>
                        <Table className="reward-table" sx={{ maxHeight: 400 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="table-row">
                                    <TableCell>{constants.ID_OF_PURCHASE}</TableCell>
                                    <TableCell>{constants.ID_OF_CUSTOMER}</TableCell>
                                    <TableCell>{constants.CUSTOMER_NAME}</TableCell>
                                    <TableCell>{constants.DATE_OF_PURCHASE}</TableCell>
                                    <TableCell>{constants.PRODUCT_PURCHASED}</TableCell>
                                    <TableCell>{constants.AMOUNT}</TableCell>
                                    <TableCell>{constants.POINTS}</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                    {items.map((item) => (
                                        <TableRow key={item.purchaseId}>
                                            <TableCell>{item.purchaseId}</TableCell>
                                            <TableCell>{item.customerId}</TableCell>
                                            <TableCell>{item.customerName}</TableCell>
                                            <TableCell>{item.purchaseDate}</TableCell>
                                            <TableCell>{item.productPurchased}</TableCell>
                                            <TableCell>{item.amount}</TableCell>
                                            <TableCell>{calculatePointsPerTransaction(item.amount)}</TableCell>
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

AllTransactionsTable.propTypes = {
    purchaseId: PropTypes.number,
    customerId: PropTypes.number,
    customerName: PropTypes.string,
    purchaseDate: PropTypes.string,
    productPurchased: PropTypes.string,
    amount: PropTypes.number
};

export default AllTransactionsTable;