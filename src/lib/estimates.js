// base functions
// calculate mean
const getMean = array => {
  return (
    array.reduce(
      (sumOfDifferences, currentValue) => sumOfDifferences + currentValue,
      0,
    ) / array.length
  );
};
// calculate standard deviation
// we are using the calculation to find the population, rather than sample, standard deviation
// to change to sample (if we only wanted to consider a user's more recent purchase history, for example) use array.length - 1
const getStandardDeviation = (array, mean) => {
  return Math.sqrt(
    array
      .reduce(
        (squaredDifferences, currentValue) =>
          squaredDifferences.concat((currentValue - mean) ** 2),
        [],
      )
      .reduce(
        (squaredDifferences, currentValue) => squaredDifferences + currentValue,
        0,
      ) / array.length,
  );
};
// calculate z-index
// we want this to be super accurate to a user's purchase history, and are using a factor of 1 for z-index as per the empirical rule.
// The empirical rule states that for a normal distribution, nearly all of the data will fall within three standard deviations of the mean.
// The rule is also called the 68-95-99 7 Rule or the Three Sigma Rule.
// The empirical rule can be broken down into three parts:
// 1) 68% of data falls within the first standard deviation from the mean.
// 2) 95% fall within two standard deviations.
// 3) 99.7% fall within three standard deviations.
const getZIndex = (currentValue, mean, standardDeviation) => {
  return (currentValue - mean) / standardDeviation;
};

// frequency calculation
const calculateFrequency = results => {
  const differencesArray = [];
  const normalizedDifferencesArray = [];
  // // calculate difference between purchase dates
  for (let i = 0; i < results.length - 1; i++) {
    differencesArray.push(results[i + 1] - results[i]);
  }
  // calculate mean
  const mean = getMean(differencesArray);
  // calculate standard deviation
  const standardDeviation = getStandardDeviation(differencesArray, mean);
  // if standard deviation is 0, it means all data points are equal and the mean is an accurate predictor of the purchase frequency
  // this also avoids NaN errors in z-index from dividing by 0
  if (standardDeviation === 0) {
    return mean;
  } else {
    // find z-index for each item in array & remove outlying data (factor of 1)
    for (let i = 0; i < differencesArray.length; i++) {
      if (
        Math.abs(getZIndex(differencesArray[i], mean, standardDeviation)) <= 1
      ) {
        normalizedDifferencesArray.push(differencesArray[i]);
      }
    }
    let newMean = getMean(normalizedDifferencesArray);
    return newMean;
  }
};

export { getMean, getStandardDeviation, getZIndex, calculateFrequency };
