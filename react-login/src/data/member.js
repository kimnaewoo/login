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
                    "uid":"admin",
                    "pwd":"1111",
                    "unm":"Administrator",
                    "eml":"admin@dc.com"
                },
                {
                    "idx": "2",
                    "uid":"tomtom",
                    "pwd":"1111",
                    "unm":"Tom",
                    "eml":"tom@gmail.com"
                }
            ]
        `
    );
  }
};
export { clearData, initData };
