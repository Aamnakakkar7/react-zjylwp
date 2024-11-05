import calculatePointsPerTransaction from './calculatePointsPerTransaction';

// this method calculates total points earned by customer
const calculateOverallRewardPoints = (purchaseData) => {
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
}

export default calculateOverallRewardPoints;