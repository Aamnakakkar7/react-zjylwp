import React from 'react';
import RewardTable from './RewardTable';
import { calculatePointsPerTransaction } from '../utils';
import { constants } from '../utils/constants';
import PropTypes from 'prop-types';


const AllTransactionsTable = ((purchaseData) => {
    const columns = [
        { field: 'purchaseId', headerName: constants.ID_OF_PURCHASE },
        { field: 'customerId', headerName: constants.ID_OF_CUSTOMER },
        { field: 'customerName', headerName: constants.CUSTOMER_NAME },
        { field: 'purchaseDate', headerName: constants.DATE_OF_PURCHASE },
        { field: 'productPurchased', headerName: constants.PRODUCT_PURCHASED },
        { field: 'amount', headerName: constants.AMOUNT },
        { field: 'points', headerName: constants.POINTS },
    ];

    const serializer = (item) => ({
        purchaseId: item.purchaseId,
        customerId: item.customerId,
        customerName: item.customerName,
        purchaseDate: item.purchaseDate,
        productPurchased: item.productPurchased,
        amount: item.amount,
        points: calculatePointsPerTransaction(item.amount),
    });

    return (
        <div>
            <h3 className='total-transactions'>{constants.ALL_TRANSACTIONS}</h3>
            <RewardTable purchaseData={Object.values(purchaseData).flat()} columns={columns} serializer={serializer} />
        </div>
    );
});

AllTransactionsTable.propTypes = {
    purchaseId: PropTypes.number,
    customerId: PropTypes.number,
    customerName: PropTypes.string,
    purchaseDate: PropTypes.string,
    productPurchased: PropTypes.string,
    amount: PropTypes.number
};

export default AllTransactionsTable;