import React from 'react';
import { calculateOverallRewardPoints } from '../utils';
import { constants } from '../utils/constants';
import RewardTable from './RewardTable';
import PropTypes from 'prop-types';

const OverallRewardsTable = ({purchaseData}) => {
    const columns = [
        { field: 'customerName', headerName: constants.CUSTOMER_NAME, sortable: false },
        { field: 'totalPoints', headerName: constants.TOTAL_POINTS_OVERALL, sortable: false },
    ]
    const customerPointsObject = calculateOverallRewardPoints(purchaseData);
    const customerPoints = Object.values(customerPointsObject || {});

    const serializer = (item) => ({
       ...item,
        totalPoints: `${item.totalPoints} ${item.totalPoints > 1 ? 'points' : 'point'}`,
    });

    return (
        <div>
            <h3 className="total-reward-heading">{constants.TOTAL_POINTS_OVERALL}</h3>
            <RewardTable 
                purchaseData={Object.values(customerPoints)} 
                columns={columns} 
                serializer={serializer}
                enableSorting={false}
                enableFiltering={false}
            />
        </div>
    )
};

OverallRewardsTable.propTypes = {
    customerId: PropTypes.number,
    customerName: PropTypes.string,
    totalRewards: PropTypes.number
};

export default OverallRewardsTable;