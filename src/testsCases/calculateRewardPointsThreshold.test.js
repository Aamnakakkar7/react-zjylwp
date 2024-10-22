import calculateRewardPointsByThreshold from '../utils/calculateRewardPointsThreshold';

describe('calculateRewardPointsByThresholdFunction', () => {
    it('Should calculate points correctly for purchase above $100', () => {
        const testDataPoints = calculateRewardPointsByThreshold(120); // above 100 threshold
        expect(testDataPoints).toBe(90);
    });

    it('Should calculate points correctly for purchase between $50 and $100', () => {
        const testDataPoints = calculateRewardPointsByThreshold(70); //between 50 and 100
        expect(testDataPoints).toBe(20);
    });

    it('Should calculate points correctly for purchase equal to $100', () => {
        const testDataPoints = calculateRewardPointsByThreshold(100); // equal to 100
        expect(testDataPoints).toBe(50);
    });

    it('Should calculate points correctly for purchase equal to $50', () => {
        const testDataPoints = calculateRewardPointsByThreshold(50); // equal to 50
        expect(testDataPoints).toBe(0);
    });

    it('Should calculate points correctly for purchase below $50', () => {
        const testDataPoints = calculateRewardPointsByThreshold(50); // below 50 threshold
        expect(testDataPoints).toBe(0);
    });

    it('Should calculate points correctly for purchase in decimal amount', () => {
        const testDataPoints = calculateRewardPointsByThreshold(72.5);
        expect(testDataPoints).toBe(23);
    });
 });