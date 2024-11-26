import React from 'react';
import RewardTable from './RewardTable';
import { constants } from '../utils/constants';
import PropTypes from 'prop-types';


const MonthlyRewardTable = (({receivedData}) => {
    const columns = [
        { field: 'customerId', headerName: constants.ID_OF_CUSTOMER, sortable: false },
        { field: 'customerName', headerName: constants.CUSTOMER_NAME, sortable: false },
        { field: 'totalRewards', headerName: constants.POINTS, sortable: false },
    ];

    const data = Object.keys(receivedData).flatMap((filterKey) => 
        Object.values(receivedData[filterKey]).map((item) => ({ ...item, filterKey }))
    );

    const serializer = (item) => item;
    return (
        <div>
            {Object.keys(receivedData).map((filterKey) => (
                <div key={filterKey}>
                    <h4>{filterKey}</h4>
                    <RewardTable 
                        purchaseData={Object.values(receivedData[filterKey])} 
                        columns={columns} 
                        serializer={serializer}
                    />
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