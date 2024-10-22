import { calculateTotalPointsPerCustomer } from "../utils/calculateTotalPointsPerCustomer";

describe('calculateTotalPointsPerCustomer', () => {
    const data = [{
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
      }]

      it('should calculate total points earned by each customer', () => {
        const resultData = calculateTotalPointsPerCustomer(data);
        expect(resultData).toEqual({
            1: {customerName: "Rahul", totalPoints: 120},
            2: {customerName: "Neha", totalPoints: 184}
        });
      });

      it('should return empty object if data is not an array', () => {
        const resultData = calculateTotalPointsPerCustomer(null);
        expect(resultData).toEqual({});
      });
});