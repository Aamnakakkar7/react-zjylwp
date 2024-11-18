import { useState, useEffect } from 'react';
import { fetchTransactionsData } from '../services/rewardProgramService';
import { latestMonthsDataSet } from '../utils';
import { constants } from '../utils/constants';
import MonthlyRewardTable from './MonthlyRewardTable';
import AllTransactionsTable from './AllTransactionsTable';
import OverallRewardsTable from './OverallRewardsTable';
import '../style.css';
import logger from '../logger';

const CustomerRewardProgram = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [latestMonthsData, setlatestMonthsData] = useState({});
  const [loadingData, setLoadingData] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchAndSetlatestMonthsData = async () => {
      try {
        const response = await fetchTransactionsData();
        if (response && response.length > 0 ) {
            setPurchaseData(response);
            const dataReceived = latestMonthsDataSet(response);
            setlatestMonthsData(dataReceived);
            logger.log('All Transactions Data has been fetched');
            logger.log('Latest three months data has been fetched successfully');
        }
      } catch (error) {
          logger.log('Error:', error.message);
          setErrorMessage(error.message);
      } finally {
        setLoadingData(false);
      }
    };
    fetchAndSetlatestMonthsData();
  }, []);

  if (errorMessage) {
    return <h3>{errorMessage}</h3>;
  }

  return (
    <div>
        {!loadingData ? 
        (
          <div>
            <h3 className="reward-heading">{constants.REWARD_TABLE}</h3>
            <div>
                <MonthlyRewardTable receivedData={latestMonthsData}/>
                <OverallRewardsTable purchaseData={purchaseData}/>
                <AllTransactionsTable receivedData={purchaseData}/>
            </div>
          </div>
        )
        :
        (<div className="loading">Loading...</div>)
      }
    </div>   
  );
};

export default CustomerRewardProgram;