import { constants } from '../utils/constants';
const fetchTransactionsData = async () => {
  try {
    const response = await fetch('/purchaseData.json');
    if (!response.ok) {
      throw new Error(constants.ERROR_MESSAGE);
    }
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    throw err;
  }
};
