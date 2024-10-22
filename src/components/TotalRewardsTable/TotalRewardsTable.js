import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants } from '../../utils/constants';
import calculateTotalPointsPerCustomer from '../../utils/calculateTotalPointsPerCustomer';
import './TotalRewardsTable.css';

const TotalRewardsTable = ((purchaseData) => {
    const customerPointsObject = calculateTotalPointsPerCustomer(purchaseData);
    const customerPoints = Object.values(customerPointsObject || {});
    console.log(customerPoints)

    return (
        <div>
            <h3 className="totalRewardHeading">{constants.TOTAL_POINTS_OVERALL}</h3>
            <TableContainer component = {Paper}>
                <Table className="totalRewardTable" sx={{ maxHeight: 400 }} aria-label="simple table">
                    <TableHead>
                        <TableRow className="table-row">
                            <TableCell>{constants.CUSTOMER_NAME}</TableCell>
                            <TableCell>{constants.TOTAL_POINTS_OVERALL}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerPoints.map((entry, index) => (
                              <TableRow key={index}>
                              <TableCell>{entry.customerName}</TableCell>
                              <TableCell>{entry.totalPoints}{' '}
                                         {entry.totalPoints > 1 ? 'points' : 'point'}
                              </TableCell>          
                          </TableRow>     
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
})

export default TotalRewardsTable;