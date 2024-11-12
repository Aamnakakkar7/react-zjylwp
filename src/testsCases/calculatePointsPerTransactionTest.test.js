import { calculatePointsPerTransaction } from '../utils';

describe('calculatePointsPerTransactionFunction', () => {
    it('Should calculate points correctly for purchase above $100', () => {
        const testDataPoints = calculatePointsPerTransaction(120); // above 100 threshold
        expect(testDataPoints).toBe(90);
    });

    it('Should calculate points correctly for purchase between $50 and $100', () => {
        const testDataPoints = calculatePointsPerTransaction(70); //between 50 and 100
        expect(testDataPoints).toBe(20);
    });

    it('Should calculate points correctly for purchase equal to $100', () => {
        const testDataPoints = calculatePointsPerTransaction(100); // equal to 100
        expect(testDataPoints).toBe(50);
    });

    it('Should calculate points correctly for purchase equal to $50', () => {
        const testDataPoints = calculatePointsPerTransaction(50); // equal to 50
        expect(testDataPoints).toBe(0);
    });

    it('Should calculate points correctly for purchase below $50', () => {
        const testDataPoints = calculatePointsPerTransaction(45); // below 50 threshold
        expect(testDataPoints).toBe(0);
    });

    it('Should return 0 reward points for incorrect amount', () => {
        const testDataPoints = calculatePointsPerTransaction('abc'); // passing string as amount
        expect(testDataPoints).toBe(0);
    });

    it('Should calculate points correctly for purchase in decimal amount', () => {
        const testDataPoints = calculatePointsPerTransaction(72.5);
        expect(testDataPoints).toBe(22);
    });
 });