// eslint-disable-next-line @typescript-eslint/no-explicit-any
const groupbykey = (arr: any[], key: string) =>
  arr.reduce((acc, cur) => {
    const needArr = acc[cur[key]] ? acc[cur[key]] : [];
    acc[cur[key]] = [...needArr, cur];
    return acc;
  }, {});

export default groupbykey;
