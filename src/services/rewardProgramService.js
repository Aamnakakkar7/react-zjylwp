import { constants } from '../utils/constants';
import logger from '../logger';

// this service fetches the purchase data from mocked JSON file.
export const fetchTransactionsData = async () => {
  try {
    const response = await fetch('/purchaseData.json');
    if (!response.ok) {
      logger.log('Error:', constants.ERROR_MESSAGE);
      throw new Error(constants.ERROR_MESSAGE);
    }
    const responseData = await response.json();
    logger.log('Fetched Customer Data From Service:', responseData);
    return responseData;

    } catch (err) {
      logger.log('Error:', err);
      throw err;
    }
};