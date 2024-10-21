import {constants} from './constants';

// This method calculates reward points as per amount spent by customer in that transaction.
const calculateRewardPointsByThreshold = (purchaseAmount) => {
    let rewardPoints = 0;
    if (purchaseAmount > constants.PURCHASE_OVER_100) {
        rewardPoints += 50 + (2 * (purchaseAmount - constants.PURCHASE_OVER_100));
        return Math.round(rewardPoints);
    }
    if (purchaseAmount > constants.PURCHASE_BETWEEN_50_AND_100) {
        rewardPoints += 1 * (purchaseAmount - constants.PURCHASE_BETWEEN_50_AND_100);
        return Math.round(rewardPoints);
    }
};

export default calculateRewardPointsByThreshold;