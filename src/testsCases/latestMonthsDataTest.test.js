import latestMonthsDataSet from '../utils/latestMonthsData';

describe('filterLatestThreeMonthsData', () => {
    const dataSet = [
        {
          "purchaseId": 1,
          "customerId": 1,
          "customerName": "Rahul",
          "purchaseDate": "2023-12-05",
          "productPurchased": "Laptop",
          "amount": 120
        },
        {
          "purchaseId": 2,
          "customerId": 1,
          "customerName": "Rahul",
          "purchaseDate": "2024-01-03",
          "productPurchased": "TV",
          "amount": 80
        },
        {
          "purchaseId": 3,
          "customerId": 2,
          "customerName": "Neha",
          "purchaseDate": "2024-01-05",
          "productPurchased": "Mobile",
          "amount": 84.6
        },
        {
          "purchaseId": 4,
          "customerId": 2,
          "customerName": "Neha",
          "purchaseDate": "2024-02-05",
          "productPurchased": "Laptop",
          "amount": 140
        },
        {
          "purchaseId": 5,
          "customerId": 2,
          "customerName": "Neha",
          "purchaseDate": "2024-03-05",
          "productPurchased": "TV",
          "amount": 70
        },
        {
          "purchaseId": 6,
          "customerId": 3,
          "customerName": "Kajal",
          "purchaseDate": "2023-03-07",
          "productPurchased": "Mobile",
          "amount": 62.5
        },
        {
          "purchaseId": 7,
          "customerId": 3,
          "customerName": "Kajal",
          "purchaseDate": "2023-04-05",
          "productPurchased": "Laptop",
          "amount": 100
        },
        {
          "purchaseId": 8,
          "customerId": 4,
          "customerName": "Ankur",
          "purchaseDate": "2024-03-05",
          "productPurchased": "Laptop",
          "amount": 105
        },
        {
          "purchaseId": 9,
          "customerId": 4,
          "customerName": "Ankur",
          "purchaseDate": "2023-12-05",
          "productPurchased": "Mobile",
          "amount": 125.8
        },
        {
          "purchaseId": 10,
          "customerId": 4,
          "customerName": "Ankur",
          "purchaseDate": "2023-11-06",
          "productPurchased": "Mobile",
          "amount": 132.4
        }
      ]

      it('should return latest 3 months data from dataset', () => {
        const resultData = latestMonthsDataSet(dataSet);
        expect(resultData).toEqual({
        'March 2024': {
          '2': { customerId: 2, customerName: 'Neha', totalRewards: 20 },
          '4': { customerId: 4, customerName: 'Ankur', totalRewards: 60 }
        },
        'February 2024': { '2': { customerId: 2, customerName: 'Neha', totalRewards: 130 } },
        'January 2024': {
          '1': { customerId: 1, customerName: 'Rahul', totalRewards: 30 },
          '2': { customerId: 2, customerName: 'Neha', totalRewards: 34 }
        }
      })
        
      });

      it('should return all available data if dataset has less than 3 months data', () => {
        const dataSet = [{
            "purchaseId": 1,
            "customerId": 1,
            "customerName": "Rahul",
            "purchaseDate": "2023-12-05",
            "productPurchased": "Laptop",
            "amount": 120
          },
          {
            "purchaseId": 2,
            "customerId": 1,
            "customerName": "Rahul",
            "purchaseDate": "2024-01-03",
            "productPurchased": "TV",
            "amount": 80
          }]
        const resultData = latestMonthsDataSet(dataSet);
        expect(resultData).toEqual({
          'January 2024': { '1': { customerId: 1, customerName: 'Rahul', totalRewards: 30 } },
          'December 2023': { '1': { customerId: 1, customerName: 'Rahul', totalRewards: 90 } }
        });
      });

      it('should group transactions by month', () => {
        const resultData = latestMonthsDataSet(dataSet);
        expect(resultData).toEqual( {
          'March 2024': {
            '2': { customerId: 2, customerName: 'Neha', totalRewards: 20 },
            '4': { customerId: 4, customerName: 'Ankur', totalRewards: 60 }
          },
          'February 2024': { '2': { customerId: 2, customerName: 'Neha', totalRewards: 130 } },
          'January 2024': {
            '1': { customerId: 1, customerName: 'Rahul', totalRewards: 30 },
            '2': { customerId: 2, customerName: 'Neha', totalRewards: 34 }
          }
        })
      });

      it('should return empty object for null or undefined dataset', () => {
        const resultDataWithNull = latestMonthsDataSet(null);
        const resultDataWithUndefined = latestMonthsDataSet(undefined);

        expect(resultDataWithNull).toEqual({});
        expect(resultDataWithUndefined).toEqual({});
      });
});