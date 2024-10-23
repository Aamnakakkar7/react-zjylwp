// This method calculates total points earned by customer considering all transactions.
const latestDataSet = (purchaseData) => {
if (!Array.isArray(purchaseData)) return {};
const sortedData = purchaseData.sort((a,b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
const latestDate = new Date(sortedData[0].purchaseDate);
const threeMonthsAgo = new Date(latestDate);
threeMonthsAgo.setMonth(latestDate.getMonth() - 3);
const filteredThreeMonthsData = sortedData.filter((data) => {
    const transactionDate = new Date(data.purchaseDate);
    return transactionDate > threeMonthsAgo && transactionDate <= latestDate;
})
if (!Array.isArray(filteredThreeMonthsData)) return {};
return filteredThreeMonthsData.reduce((acc, item) => {
    const date = new Date(item.purchaseDate);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const filterationKey = `${month} ${year}`;
    if (!acc[filterationKey]) {
        acc[filterationKey] = [];
    }
    acc[filterationKey].push(item);
    return acc;
},{});
}

export default latestDataSet;
