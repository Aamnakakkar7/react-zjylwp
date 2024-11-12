import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants, calculateOverallRewardPoints } from '../utils';
import '../style.css';
import PropTypes from 'prop-types';

const OverallRewardsTable = ({purchaseData}) => {
    const customerPointsObject = calculateOverallRewardPoints(purchaseData);
    const customerPoints = Object.values(customerPointsObject || {});

    return (
        <div>
            <h3 className="total-reward-heading">{constants.TOTAL_POINTS_OVERALL}</h3>
            <TableContainer component = {Paper}>
                <Table className="total-reward-table" sx={{ maxHeight: 400 }} aria-label="simple table">
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
};

OverallRewardsTable.propTypes = {
    customerId: PropTypes.number,
    customerName: PropTypes.string,
    totalRewards: PropTypes.number
};

export default OverallRewardsTable;