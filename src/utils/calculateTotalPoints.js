import calculateRewardPointsByThreshold from "./calculateRewardPointsThreshold";

// This method calculates total points earned by customer considering all transactions.
export const calculateTotalPoints = (purchaseData) => {
    return purchaseData.reduce((totalPointsEarnedByCustomer, singlePurchaseData) => {
        const { customerName, customerId, amount, purchaseId, purchaseDate } = singlePurchaseData;
        const date = new Date(purchaseDate);
        const month = date.getMonth();
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' });
        const custId = customerId;
        const transactionId = purchaseId;
        const points = calculateRewardPointsByThreshold(amount);

        if (!totalPointsEarnedByCustomer[customerId]) {
            totalPointsEarnedByCustomer[customerId] = {
                customerId: custId,
                purchaseId: transactionId,
                purchaseDate: purchaseDate,
                customerName: '',
                rewardPointsInYear: {},
                totalPoints: 0,
                totalAmountSpent: 0
            }
        }

        if (!totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year]){
            totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year] = {
                rewardPointsInMonth: {},
                totalRewardPointsInYear: 0,
                totalAmountInYear: 0,
            }
        }

        if(!totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].rewardPointsInMonth[month]) {
            totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].rewardPointsInMonth[month]= {
                monthName: '',
                pointsInThatMonth : 0,
                amountSpentInThatMonth: 0
            }
        }

        totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].monthName += monthName;
        totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].pointsInThatMonth += points;
        totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].rewardPointsInMonth[month].amountSpentInThatMonth += amount;

        totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].totalRewardPointsInYear += points;
        totalPointsEarnedByCustomer[customerId].rewardPointsInYear[year].totalAmountInYear += amount;

        totalPointsEarnedByCustomer[customerId].customerName = customerName;
        totalPointsEarnedByCustomer[customerId].totalPoints += points;
        totalPointsEarnedByCustomer[customerId].totalAmountSpent += amount;

        return totalPointsEarnedByCustomer;
    },{})
}