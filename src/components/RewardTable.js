import React from 'react';
import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import '../style.css';

const RewardTable = ({ purchaseData, columns, serializer }) => {
    console.log('data:', purchaseData);
    console.log('columns:', columns);
    return (
        <TableContainer component = {Paper}>
            <Table className="reward-table" sx={{ maxHeight: 400 }} aria-label="custom table">
                <TableHead>
                    <TableRow className="table-row">
                        {columns.map((column) => (
                        <TableCell key={column.field}>{column.headerName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {purchaseData.map((item, index) => {
                        console.log('item in reward table', item )
                        const row = serializer(item);
                        console.log('row:', row)
                        return (
                            <TableRow key={index}>
                                {columns.map((column) => {
                                    <TableCell key={column.field}>{row[column.field]}</TableCell>
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// AllTransactionsTable.propTypes = {
//     purchaseId: PropTypes.number,
//     customerId: PropTypes.number,
//     customerName: PropTypes.string,
//     purchaseDate: PropTypes.string,
//     productPurchased: PropTypes.string,
//     amount: PropTypes.number
// };

export default RewardTable;