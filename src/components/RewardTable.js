import React from 'react';
import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import '../style.css';

const RewardTable = ({ purchaseData, columns, serializer }) => {
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
                        const row = serializer(item);
                        return (
                            <TableRow key={index}>
                                {columns.map((column) => {
                                    return <TableCell key={column.field}>{row[column.field]}</TableCell>
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RewardTable;