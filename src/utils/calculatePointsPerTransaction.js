import {constants} from './constants';
import logger from '../logger';

// This method calculates reward points as per amount spent by customer in that transaction.
const calculatePointsPerTransaction = (purchaseAmount) => {
    if (isNaN(purchaseAmount) || typeof purchaseAmount !== 'number') return 0;
    const { PURCHASE_OVER_100, PURCHASE_BETWEEN_50_AND_100 } = constants;
    const rewardPoints = purchaseAmount > PURCHASE_OVER_100 ? 50 + 2 * (purchaseAmount - PURCHASE_OVER_100) : purchaseAmount > PURCHASE_BETWEEN_50_AND_100 ? purchaseAmount - PURCHASE_BETWEEN_50_AND_100 : 0;
    logger.log('Points earned for this transaction:', rewardPoints);
    return Math.floor(rewardPoints);
    
};
export default calculatePointsPerTransaction;