import { calculateTotalPoints } from "../utils/calculateTotalPoints";

describe('calculateTotalPointsFunction', () => {
    it('Should calculate total points correctly for single purchase done by customer', () => {
        const purchase = [
            {
              "purchaseId": 1,
              "customerId": 1,
              "customerName": "Rahul",
              "purchaseDate": "2023-12-05",
              "productPurchased": "Laptop",
              "amount": 80
            }
        ]

        const returnedArray = {
            '1': {
                "customerName": "Rahul",
                "rewardPointsInYear": {
                    2023: {
                        "rewardPointsInMonth": {
                            1: {
                                "monthName" : "December",
                                "pointsInThatMonth" : 30,
                                "amountSpentInThatMonth" : 80
                            }

                        },
                        "totalRewardPointsInYear": 30,
                        "totalAmountInYear": 80

                    }
                },
                "totalPoints": 30,
                "totalAmountSpent": 80
            }
        }

        expect(calculateTotalPoints(purchase)).toEqual(returnedArray);
    });

    it('Should calculate total points correctly for purchases done by 2 customers', () => {
        const purchase = [
            {
              "purchaseId": 1,
              "customerId": 1,
              "customerName": "Rahul",
              "purchaseDate": "2023-12-05",
              "productPurchased": "Laptop",
              "amount": 80
            },
            {
              "purchaseId": 2,
              "customerId": 2,
              "customerName": "Neha",
              "purchaseDate": "2023-11-06",
              "productPurchased": "Laptop",
              "amount": 110
            }

        ]

        const returnedArray = {
            '1': {
                "customerName": "Rahul",
                "rewardPointsInYear": {
                    2023: {
                        "rewardPointsInMonth": {
                            1: {
                                "monthName" : "December",
                                "pointsInThatMonth" : 30,
                                "amountSpentInThatMonth" : 80
                            }

                        },
                        "totalRewardPointsInYear": 30,
                        "totalAmountInYear": 80

                    }
                },
                "totalPoints": 30,
                "totalAmountSpent": 80
            },
            '2': {
                "customerName": "Neha",
                "rewardPointsInYear": {
                    2023: {
                        "rewardPointsInMonth": {
                            1: {
                                "monthName" : "November",
                                "pointsInThatMonth" : 70,
                                "amountSpentInThatMonth" : 110
                            }

                        },
                        "totalRewardPointsInYear": 70,
                        "totalAmountInYear": 110

                    }
                },
                "totalPoints": 70,
                "totalAmountSpent": 110
            }
        }

        expect(calculateTotalPoints(purchase)).toEqual(returnedArray);
    });

    it('Should calculate total points correctly for purchase done by customer below $50', () => {
        const purchase = [
            {
              "purchaseId": 1,
              "customerId": 1,
              "customerName": "Rahul",
              "purchaseDate": "2023-12-05",
              "productPurchased": "cover",
              "amount": 40
            }
        ]

        const returnedArray = {
            '1': {
                "customerName": "Rahul",
                "rewardPointsInYear": {
                    2023: {
                        "rewardPointsInMonth": {
                            1: {
                                "monthName" : "December",
                                "pointsInThatMonth" : 0,
                                "amountSpentInThatMonth" : 40
                            }

                        },
                        "totalRewardPointsInYear": 0,
                        "totalAmountInYear": 40

                    }
                },
                "totalPoints": 0,
                "totalAmountSpent": 40
            }
        }

        expect(calculateTotalPoints(purchase)).toEqual(returnedArray);
    });
});