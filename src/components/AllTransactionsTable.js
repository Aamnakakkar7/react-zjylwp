import React, { useState, useMemo } from 'react';
import RewardTable from './RewardTable';
import { calculatePointsPerTransaction } from '../utils';
import { constants } from '../utils/constants';
import PropTypes from 'prop-types';


const AllTransactionsTable = ((purchaseData) => {
    const [ filterText, setFilterText ] = useState('');
    const [ sortConfig, setSortConfig ] = useState({key: 'purchaseId', direction: 'asc'}); // default sorting by ascending order

    const columns = [
        { field: 'purchaseId', headerName: constants.ID_OF_PURCHASE, sortable: true },
        { field: 'customerId', headerName: constants.ID_OF_CUSTOMER, sortable: true },
        { field: 'customerName', headerName: constants.CUSTOMER_NAME, sortable: true },
        { field: 'purchaseDate', headerName: constants.DATE_OF_PURCHASE, sortable: true },
        { field: 'productPurchased', headerName: constants.PRODUCT_PURCHASED },
        { field: 'amount', headerName: constants.AMOUNT, sortable: true },
        { field: 'points', headerName: constants.POINTS, sortable: true},
    ];

    const serializer = (item) => ({
       ...item,
        points: calculatePointsPerTransaction(item.amount),
    });

    const filteredData = useMemo(() => {
        const flatData = Object.values(purchaseData).flat();
        if (!filterText) return flatData;
        
        return Object.values(flatData).filter((item) => 
            item.customerName.toLowerCase().includes(filterText.toLowerCase()) //filtering by customer name
        );
    }, [purchaseData, filterText]);

    const sortedData = useMemo(() => {
        if (!sortConfig) return filteredData;
        const sorted = Object.values(filteredData).sort((a, b) => {
            const aValue = serializer(a)[sortConfig.key]; 
            const bValue = serializer(b)[sortConfig.key];
            if (sortConfig.direction === 'asc') return aValue > bValue ? 1 : -1; 
            if (sortConfig.direction === 'desc') return aValue < bValue ? 1 : -1; 
            return 0; 
        }); 
        return sorted; 
    }, [filteredData, sortConfig]);

    const handleSort = (key) => { 
        setSortConfig((prevConfig) => { 
            if (prevConfig && prevConfig.key === key) { 
                return { 
                    key, 
                    direction: prevConfig.direction === 'asc' ? 'desc' : 'asc', 
                }; 
            } 
            return { key, direction: 'asc' }; 
        }); 
    }; 

    return (
        <div>
            <h3 className='total-transactions'>{constants.ALL_TRANSACTIONS}</h3>
            <div className='search-container'><input className="search-bar" type="text" placeholder="Search" value={filterText} onChange={(e) => setFilterText(e.target.value)}/></div>
            <RewardTable 
                purchaseData={sortedData} 
                columns={columns}
                serializer={serializer}
                onSort={handleSort}
                sortConfig={sortConfig} 
                noResults={constants.NO_RESULTS}
            />
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