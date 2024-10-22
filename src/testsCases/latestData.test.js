import latestDataSet from '../utils/latestData';

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
        const resultData = latestDataSet(dataSet);
        expect(resultData).toEqual([
            {
                "purchaseId": 5,
                "customerId": 2,
                "customerName": "Neha",
                "purchaseDate": "2024-03-05",
                "productPurchased": "TV",
                "amount": 70
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
                "purchaseId": 4,
                "customerId": 2,
                "customerName": "Neha",
                "purchaseDate": "2024-02-05",
                "productPurchased": "Laptop",
                "amount": 140
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
                "purchaseId": 2,
                "customerId": 1,
                "customerName": "Rahul",
                "purchaseDate": "2024-01-03",
                "productPurchased": "TV",
                "amount": 80
            }
        ]);
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
        const resultData = latestDataSet(dataSet);
        expect(resultData).toEqual([{
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
          }]);
      });

      it('should group transactions by month', () => {
        const resultData = latestDataSet(dataSet);
        expect(resultData).toEqual({
            'March 2024' : [{
                "purchaseId": 5,
                "customerId": 2,
                "customerName": "Neha",
                "purchaseDate": "2024-03-05",
                "productPurchased": "TV",
                "amount": 70
            },
            {
                "purchaseId": 8,
                "customerId": 4,
                "customerName": "Ankur",
                "purchaseDate": "2024-03-05",
                "productPurchased": "Laptop",
                "amount": 105
            }],
            'February 2024': [{
                "purchaseId": 4,
                "customerId": 2,
                "customerName": "Neha",
                "purchaseDate": "2024-02-05",
                "productPurchased": "Laptop",
                "amount": 140
            }],
            'January 2024': [{
                "purchaseId": 3,
                "customerId": 2,
                "customerName": "Neha",
                "purchaseDate": "2024-01-05",
                "productPurchased": "Mobile",
                "amount": 84.6
            },
            {
                "purchaseId": 2,
                "customerId": 1,
                "customerName": "Rahul",
                "purchaseDate": "2024-01-03",
                "productPurchased": "TV",
                "amount": 80
            }]
        });
      });

      it('should return empty object for null or undefined dataset', () => {
        const resultDataWithNull = latestDataSet(null);
        const resultDataWithUndefined = latestDataSet(undefined);

        expect(resultDataWithNull).toEqual({});
        expect(resultDataWithUndefined).toEqual({});
      });
});