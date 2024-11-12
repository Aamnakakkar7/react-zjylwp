import {constants} from './constants';
import logger from '../logger';

// This method calculates reward points as per amount spent by customer in that transaction.
const calculatePointsPerTransaction = (purchaseAmount) => {
    if (isNaN(purchaseAmount) || typeof purchaseAmount !== 'number') return 0;
    const { PURCHASE_OVER_100, PURCHASE_BETWEEN_50_AND_100 } = constants;
    const transactionAmount = Math.floor(purchaseAmount);
    const rewardPoints = transactionAmount > PURCHASE_OVER_100 ? 50 + 2 * (transactionAmount - PURCHASE_OVER_100) : transactionAmount > PURCHASE_BETWEEN_50_AND_100 ? transactionAmount - PURCHASE_BETWEEN_50_AND_100 : 0;
    logger.log('Reward Points awarded for this transaction');
    return rewardPoints;
    
};
export default calculatePointsPerTransaction;