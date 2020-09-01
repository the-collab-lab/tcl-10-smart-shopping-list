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
  console.log('from standard deviation', array, mean);
  return Math.sqrt(
    array
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) / array.length,
  );
};
const getZIndex = (datum, mean, standardDeviation) => {
  return (datum - mean) / standardDeviation;
};

const calculateFrequency = results => {
  const arr = [];
  const newArr = [];
  // // calculate difference between purchase dates
  for (let i = 0; i < results.length - 1; i++) {
    arr.push(results[i + 1] - results[i]);
  }
  console.log(arr);

  // calculate mean
  const mean = getMean(arr);
  console.log('mean', mean);

  // calculate standard deviation
  // we are using the calculation to find the population, rather than sample, standard deviation
  const standardDeviation = getStandardDeviation(arr, mean);
  console.log('SD', standardDeviation);

  if (standardDeviation === 0) {
    // if standard deviation is 0, it means all data points are equal and the mean is an accurate predictor of the purchase frequency
    // this also avoids NaN errors from dividing 0 / 0
    return mean;
  } else {
    // find z-index for each item in array & remove outlying data
    // we want this to be super accurate to a user's purchase history, and are using 2 standard deviations as per the empirical rule.
    // The empirical rule states that for a normal distribution, nearly all of the data will fall within three standard deviations of the mean.
    // The empirical rule can be broken down into three parts:
    // 1) 68% of data falls within the first standard deviation from the mean.
    // 2) 95% fall within two standard deviations.
    // 3) 99.7% fall within three standard deviations.
    // The rule is also called the 68-95-99 7 Rule or the Three Sigma Rule.
    for (let i = 0; i < arr.length; i++) {
      console.log(i, 'zIndex', getZIndex(arr[i], mean, standardDeviation));
      if (Math.abs(getZIndex(arr[i], mean, standardDeviation)) < 2) {
        newArr.push(arr[i]);
      }
    }
    let newMean = getMean(newArr);

    return newMean;
  }
};

export { getMean, getStandardDeviation, getZIndex, calculateFrequency };
