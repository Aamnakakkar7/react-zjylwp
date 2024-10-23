import { useState, useEffect } from 'react';
import { fetchTransactionsData } from '../../services/rewardProgramService';
import latestDataSet from '../../utils/latestData';
import { constants } from '../../utils/constants';
import CustomerRewardTable from '../CustomerRewardTable/CustomerRewardTable';
import AllTransactionsTable from '../AllTransactionsTable/AllTransactionsTable';
import TotalRewardsTable from '../TotalRewardsTable/TotalRewardsTable';
import './CustomerRewardProgram.css'

const CustomerRewardProgram = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [latestData, setLatestData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setLoadingData(true);
    const getPurchaseDataFromApi = async () => {
      try {
        const response = await fetchTransactionsData();
        setPurchaseData(response);
        setLoadingData(false);
      } catch (errorMessage) {
          setErrorMessage(errorMessage);
          setLoadingData(false);
      }
    }
    getPurchaseDataFromApi();
  }, []);

  useEffect(() => {
    if (purchaseData && purchaseData.length > 0) {
      const dataReceived = latestDataSet(purchaseData);
      setLatestData(dataReceived);
    }
  }, [purchaseData]);
  
  useEffect(() => {
    setTimeout(() => {
        setLoadingData(false);
    }, 1000);
  }, [purchaseData])


  if (errorMessage) {
    return <h3>{errorMessage}</h3>;
  }

  return (
    <div>
        {!loadingData ? 
        (
          <div>
            <h3 className="rewardHeading">{constants.REWARD_TABLE}</h3>
            <div>
                <CustomerRewardTable receivedData={latestData}/>
                <TotalRewardsTable purchaseData={purchaseData}/>
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
