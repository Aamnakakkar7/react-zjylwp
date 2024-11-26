import React, { useMemo } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import '../style.css';

const RewardTable = ({ purchaseData, columns, serializer, onSort, sortConfig, noResults }) => {
    const memoizedSerializar = useMemo(() => serializer, [serializer]);

    const getSortIndicator = (columnKey) => {
        if (!sortConfig || sortConfig.key !== columnKey) return null;
        return sortConfig.direction === 'asc' ? (
            <ArrowUpwardIcon/>
        ) : (
            <ArrowDownwardIcon />
        );     
    };

    return (
        <TableContainer component = {Paper}>
            <Table className="reward-table" sx={{ maxHeight: 400 }} aria-label="custom table">
                <TableHead>
                    <TableRow className="table-row">
                        {columns.map((column) => (
                        <TableCell 
                            key={column.field}
                            onClick={() => onSort && onSort(column.field)}>
                            {column.headerName}
                            {onSort && getSortIndicator(column.field)}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody> 
                    {purchaseData.length > 0 ? (
                        (Object.values(purchaseData)).map((item, index) => {
                            const row = memoizedSerializar(item);
                            return (
                                <TableRow key={index}>
                                    {columns.map((column) => {
                                        return <TableCell key={column.field}>{row[column.field]}</TableCell>
                                    })}
                                </TableRow>
                            );
                        })
                    ) :  (
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                {noResults}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RewardTable;