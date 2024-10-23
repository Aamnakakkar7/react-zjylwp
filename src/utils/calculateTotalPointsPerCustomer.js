import calculateRewardPointsByThreshold from './calculateRewardPointsThreshold';

// this method calculates total points earned by customer
const calculateTotalPointsPerCustomer = (purchaseData) => {
    if (!Array.isArray(Object.values(purchaseData))) {
        return {};
    }
    return Object.values(purchaseData).reduce((acc, items) => {
        items.map((item) => {
            const { customerName, customerId, amount } = item;
            if (!acc[customerId]) {
                acc[customerId] = {customerName, totalPoints: 0};
            }
            acc[customerId].totalPoints += calculateRewardPointsByThreshold(amount);
        })
        return acc;
    },{});
}

export default calculateTotalPointsPerCustomer;