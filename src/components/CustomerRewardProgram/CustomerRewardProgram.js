import { useState, useEffect } from 'react';
import { fetchTransactionsData } from '../../services/rewardProgramService';
import { calculateTotalPoints } from '../../utils/calculateTotalPoints';
import { constants } from '../../utils/constants';
import CustomerRewardTable from '../CustomerRewardTable/CustomerRewardTable';
import TotalRewardsTable from '../TotalRewardsTable/TotalRewardsTable';
import './CustomerRewardProgram.css'

const CustomerRewardProgram = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [totalPoints, setTotalPoints] = useState({});
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
      const totalRewardPoints = calculateTotalPoints(purchaseData);
      setTotalPoints(totalRewardPoints);
    }
  }, [purchaseData]);

  useEffect(() => {
    setTimeout(() => {
        setLoadingData(false);
    }, 1000);
  }, [totalPoints])


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
              {Object.keys(totalPoints).sort((a,b) => a - b).map((customerId) => (
                <div key={customerId}>
                  <CustomerRewardTable totalReceivedPoints={totalPoints} customerId={customerId}/>
                </div>
              ))}
            <TotalRewardsTable totalReceivedPoints={totalPoints}/>
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
