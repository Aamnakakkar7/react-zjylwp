import logger from "../logger";
import calculatePointsPerTransaction from "./calculatePointsPerTransaction";

// This method filters latest 3 months data from dataset.
const latestMonthsDataSet = (purchaseData) => {
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
}
export default latestMonthsDataSet;