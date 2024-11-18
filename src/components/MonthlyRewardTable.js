import React from 'react';
import RewardTable from './RewardTable';
import { constants } from '../utils';
import PropTypes from 'prop-types';


const MonthlyRewardTable = (({receivedData}) => {
    const columns = [
        { field: 'customerId', headerName: constants.ID_OF_CUSTOMER },
        { field: 'customerName', headerName: constants.CUSTOMER_NAME },
        { field: 'totalRewards', headerName: constants.POINTS },
    ];

    const data = Object.keys(receivedData).flatMap((filterKey) => 
        Object.values(receivedData[filterKey]).map((item) => ({ ...item, filterKey }))
    );

    const serializer = (item) => ({
        customerId: item.customerId,
        customerName: item.customerName,
        totalRewards: item.totalRewards,
    });
    return (
        <div>
            {Object.keys(receivedData).map((filterKey) => (
                <div key={filterKey}>
                    <h4>{filterKey}</h4>
                    <RewardTable purchaseData={Object.values(receivedData[filterKey])} columns={columns} serializer={serializer} />
                </div>
            ))}
        </div>
    );
});

MonthlyRewardTable.propTypes = {
    customerId: PropTypes.number,
    customerName: PropTypes.string,
    totalRewards: PropTypes.number
};

export default MonthlyRewardTable;