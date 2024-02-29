const countToChartData = (arrayToCount: string[]) => {
  const countSth: { [key: string]: number } = {};

  arrayToCount.forEach((loca) => {
    if (countSth[loca]) {
      countSth[loca]++;
    } else {
      countSth[loca] = 1;
    }
    return countSth;
  });
  return countSth;
};
export default countToChartData;
