/**
 * Calculate a weighted estimate for the interval until the next purchase
 * Current purchase a tiny bit less weight than all previous purchases
 *
 * @param {Number} lastEstimate The last estimated purchase interval
 * @param {Number} latestInterval The number of days between the most recent and previous purchases
 * @param {Number} numberOfPurchases Total number of purchases for the item
 *
 * @return {Number} Estimated number of days until the next purchase
 */
// const calculateEstimate = (lastEstimate, latestInterval, numberOfPurchases) => {
//     if (numberOfPurchases >= 2) {
//         if (isNaN(lastEstimate)) {
//             lastEstimate = 14;
//         }
//         let previousFactor = lastEstimate * numberOfPurchases;
//         let latestFactor = latestInterval * (numberOfPurchases - 1);
//         let totalDivisor = numberOfPurchases * 2 - 1;
//         return Math.round((previousFactor + latestFactor) / totalDivisor);
//     } else {
//         return latestInterval;
//     }
// };

// export default calculateEstimate;

const getMean = array => {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
};
const getStandardDeviation = (array, mean) => {
  return Math.sqrt(
    array
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (array.length - 1),
  );
};
const getZIndex = (datum, mean, standardDeviation) => {
  return Math.abs((datum - mean) / standardDeviation);
};

const calculateFrequency = results => {
  const arr = [];
  const newArr = [];
  // // calculate difference between purchase dates
  for (let i = 0; i < results.length - 1; i++) {
    arr.push(Math.abs(Math.floor(results[i + 1] - results[i])));
  }
  // // // calculate mean
  const mean = getMean(arr);

  // // // calculate standard deviation
  const standardDeviation = getStandardDeviation(arr, mean);

  if (standardDeviation === 0) {
    return mean;
  }
  // find z-index for each item in array & remove outliers

  for (let i = 0; i <= arr.length; i++) {
    if (getZIndex(arr[i], mean, standardDeviation) < 2) {
      newArr.push(arr[i]);
    }
  }
  let newMean = getMean(newArr);

  return newMean;
};

export { getMean, getStandardDeviation, getZIndex, calculateFrequency };
