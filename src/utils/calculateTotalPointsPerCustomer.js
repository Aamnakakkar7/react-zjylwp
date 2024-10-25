import calculateRewardPointsByThreshold from './calculateRewardPointsThreshold';

// this method calculates total points earned by customer
const calculateTotalPointsPerCustomer = (purchaseData) => {
    if (!Array.isArray(purchaseData)) {
        return {};
    }
 
    return purchaseData.reduce((acc, items) => {
        const { customerName, customerId, amount } = items;
        if (!acc[customerId]) {
            acc[customerId] = {customerName, totalPoints: 0};
        }
        acc[customerId].totalPoints += calculateRewardPointsByThreshold(amount);
        return acc;
    },{});
}

export default calculateTotalPointsPerCustomer;