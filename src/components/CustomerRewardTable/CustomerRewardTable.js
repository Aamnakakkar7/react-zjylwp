import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants } from '../../utils/constants';
import './CustomerRewardTable.css';

const CustomerRewardTable = (({totalReceivedPoints, customerId}) => {
    return (
        <div>
            <h3>{`${customerId}. ${totalReceivedPoints[customerId].customerName}`}</h3>
            <TableContainer component = {Paper}>
                <Table className="rewardTable" sx={{ maxHeight: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="table-row">
                            <TableCell>{constants.YEAR_OF_PURCHASE}</TableCell>
                            <TableCell>{constants.MONTH_OF_PURCHASE}</TableCell>
                            <TableCell>{constants.AMOUNT}</TableCell>
                            <TableCell>{constants.DATE_OF_PURCHASE}</TableCell>
                            <TableCell>{constants.POINTS}</TableCell>
                            <TableCell>{constants.TOTAL_POINTS_IN_YEAR}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(totalReceivedPoints[customerId].rewardPointsInYear).sort((a,b) => b - a ).map((year) => (
                            Object.keys(totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth).sort((a,b) => b - a).map((month, index)=> (
                                <TableRow key={`${year}-${month}-${index}`}>
                                    {index === 0 && (
                                        <TableCell rowSpan={Object.keys(totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth).length}>{year}</TableCell>
                                    )}
                                    <TableCell>{totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].monthName}</TableCell>
                                    <TableCell>{'$'}{totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].amountSpentInThatMonth}</TableCell>
                                    <TableCell>{totalReceivedPoints[customerId].purchaseDate}</TableCell>
                                    <TableCell>{totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].pointsInThatMonth}{' '}
                                    {totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].pointsInThatMonth > 1 ? 'points' : 'point'}
                                    </TableCell>
                                    {index === 0 && (
                                        <TableCell rowSpan={Object.keys(totalReceivedPoints[customerId].rewardPointsInYear[year].rewardPointsInMonth).length}>
                                            {totalReceivedPoints[customerId].rewardPointsInYear[year].totalRewardPointsInYear}{' '}
                                            {totalReceivedPoints[customerId].rewardPointsInYear[year].totalRewardPointsInYear > 1 ? 'points' : 'point'}
                                        </TableCell>
                                    )}
                                </TableRow>   
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        );
})

export default CustomerRewardTable;