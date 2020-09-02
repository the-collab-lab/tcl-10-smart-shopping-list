// base functions
// calculate mean
const getMean = array => {
  return array.reduce((acc, val) => acc + val, 0) / array.length;
};
// calculate standard deviation
// we are using the calculation to find the population, rather than sample, standard deviation
// to change to sample (if we only wanted to consider a user's more recent purchase history, for example) use array.length - 1
const getStandardDeviation = (array, mean) => {
  return Math.sqrt(
    array
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) / array.length,
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
const getZIndex = (datum, mean, standardDeviation) => {
  return (datum - mean) / standardDeviation;
};

// frequency calculation
const calculateFrequency = results => {
  const arr = [];
  const newArr = [];
  // // calculate difference between purchase dates
  for (let i = 0; i < results.length - 1; i++) {
    arr.push(results[i + 1] - results[i]);
  }
  // calculate mean
  const mean = getMean(arr);
  // calculate standard deviation
  const standardDeviation = getStandardDeviation(arr, mean);
  // if standard deviation is 0, it means all data points are equal and the mean is an accurate predictor of the purchase frequency
  // this also avoids NaN errors in z-index from dividing by 0
  if (standardDeviation === 0) {
    return mean;
  } else {
    // find z-index for each item in array & remove outlying data (factor of 1)
    for (let i = 0; i < arr.length; i++) {
      if (Math.abs(getZIndex(arr[i], mean, standardDeviation)) <= 1) {
        newArr.push(arr[i]);
      }
    }
    let newMean = getMean(newArr);
    return newMean;
  }
};

export { getMean, getStandardDeviation, getZIndex, calculateFrequency };
