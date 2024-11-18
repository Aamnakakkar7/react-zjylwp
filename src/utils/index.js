import { constants } from './constants';
import logger from '../logger';

// this method calculates total points earned by customer
export const calculateOverallRewardPoints = (purchaseData) => {
    if (!Array.isArray(purchaseData)) {
        return {};
    }
 
    return purchaseData.reduce((acc, items) => {
        const { customerName, customerId, amount } = items;
        if (!acc[customerId]) {
            acc[customerId] = {customerName, totalPoints: 0};
        }
        acc[customerId].totalPoints += calculatePointsPerTransaction(amount);
        return acc;
    },{});
};

// This method calculates reward points as per amount spent by customer in that transaction.
export const calculatePointsPerTransaction = (purchaseAmount) => {
    if (isNaN(purchaseAmount) || typeof purchaseAmount !== 'number') return 0;
    const { PURCHASE_OVER_100, PURCHASE_BETWEEN_50_AND_100 } = constants;
    const transactionAmount = Math.floor(purchaseAmount);
    const rewardPoints = transactionAmount > PURCHASE_OVER_100 ? 50 + 2 * (transactionAmount - PURCHASE_OVER_100) : transactionAmount > PURCHASE_BETWEEN_50_AND_100 ? transactionAmount - PURCHASE_BETWEEN_50_AND_100 : 0;
    logger.log('Reward Points awarded for this transaction');
    return rewardPoints;
    
};

// This method filters latest 3 months data from dataset.
export const latestMonthsDataSet = (purchaseData) => {
    if (!Array.isArray(purchaseData)) return {};
    const sortedData = purchaseData.sort((a,b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    const latestDate = new Date(sortedData[0].purchaseDate);
    const threeMonthsAgo = new Date(latestDate);
    threeMonthsAgo.setMonth(latestDate.getMonth() - 3);
    const filteredThreeMonthsData = sortedData.filter((data) => {
        const transactionDate = new Date(data.purchaseDate);
        return transactionDate > threeMonthsAgo && transactionDate <= latestDate;
    });

    return filteredThreeMonthsData.reduce((acc, item) => {
        const date = new Date(item.purchaseDate);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'long' });
        const filterKey = `${month} ${year}`;
        const points = calculatePointsPerTransaction(item.amount);
        if (!acc[filterKey]) {
            acc[filterKey] = {};
        } 
        if (!acc[filterKey][item.customerId]) {
            acc[filterKey][item.customerId] = {
                customerId: item.customerId,
                customerName: item.customerName,
                totalRewards: 0,
            }
        }
        acc[filterKey][item.customerId].totalRewards += points;
        return acc;
    },{});
};