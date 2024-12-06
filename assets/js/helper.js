export const formatePrice = (price) => {
  return price.toLocaleString("fa-IR");
};
export const sleep = (time) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(true);
    }, time);
  });
};
