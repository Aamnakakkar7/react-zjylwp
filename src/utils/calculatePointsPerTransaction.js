import {constants} from './constants';
import logger from '../logger';

// This method calculates reward points as per amount spent by customer in that transaction.
const calculatePointsPerTransaction = (purchaseAmount) => {
    
    let rewardPoints = 0;
    if (purchaseAmount > constants.PURCHASE_OVER_100) {
        rewardPoints += 50 + (2 * (purchaseAmount - constants.PURCHASE_OVER_100));
        logger.log('Points earned for this transaction:', rewardPoints);
    } else if (purchaseAmount > constants.PURCHASE_BETWEEN_50_AND_100) {
        rewardPoints += (purchaseAmount - constants.PURCHASE_BETWEEN_50_AND_100);
        logger.log('Points earned for this transaction:', rewardPoints);
    } else {
        rewardPoints = 0;
        logger.log('Points earned for this transaction:', rewardPoints);
    }
    return Math.floor(rewardPoints);
    
};
export default calculatePointsPerTransaction;