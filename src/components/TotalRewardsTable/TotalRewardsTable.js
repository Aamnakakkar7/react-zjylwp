import { Table, TableContainer, TableBody, TableCell, TableRow, TableHead, Paper} from '@mui/material';
import { constants } from '../../utils/constants';
import './TotalRewardsTable.css';

const TotalRewardsTable = (({totalReceivedPoints}) => {
    const uniquePointsObject = Object.values(totalReceivedPoints).reduce((acc, value) => {
        acc[value.customerName] = value.totalPoints;
        return acc;
    },{});

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
                        {Object.entries(uniquePointsObject).map((entry, index) => (
                              <TableRow key={`${index}`}>
                              <TableCell>{entry[0]}</TableCell>
                              <TableCell>{entry[1]}{' '}
                                         {entry[1] > 1 ? 'points' : 'point'}
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