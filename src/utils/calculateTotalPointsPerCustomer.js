import calculateRewardPointsByThreshold from './calculateRewardPointsThreshold';

const calculateTotalPointsPerCustomer = (purchaseData) => {
    if (!Array.isArray(Object.values(purchaseData))) {
        console.log('hi')
        return {};
    }
    return Object.values(purchaseData).reduce((acc, items) => {
        console.log(items)
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