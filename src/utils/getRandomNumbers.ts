process.on("message", (n) => {
  // @ts-ignore
  process.send(calculate(n));
});

const calculate = (n: number) => {
  const result: { [k: number]: number } = {};
  while (n--) {
    const val = Math.ceil(Math.random() * 1000);
    if (!result[val]) result[val] = 0;
    result[val]++;
  }
  return result;
};
