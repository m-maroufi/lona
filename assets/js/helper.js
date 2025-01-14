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
export function convertToEnglish(input) {
  const persianToEnglishMap = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };

  return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
}

