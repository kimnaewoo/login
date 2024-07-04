const clearData = () => {
  localStorage.clear();
};

const initData = () => {
  if (localStorage.getItem('mem-data') === null) {
    localStorage.setItem(
      'mem-data',
      `
            [
                {
                    "idx": "1",
                    "uid":"developer",
                    "pwd":"1111",
                    "unm":"kimnaewoo",
                    "eml":"pront@end.com"
                },
                {
                    "idx": "2",
                    "uid":"developer2",
                    "pwd":"1111",
                    "unm":"kimnaewoo",
                    "eml":"pront@end.com"
                }
            ]
        `
    );
  }
};
export { clearData, initData };
