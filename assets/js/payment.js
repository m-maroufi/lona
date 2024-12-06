import { formatePrice } from "./helper.js";
const cart__quntity = document.querySelector("#cart__quntity");
const order__item__wrapper = document.querySelector("#order__item__wrapper");
const item__from__cart = document.querySelector("#item__from__cart").content;
const paybtn = document.querySelector("#pay");

const checkoutPayment = JSON.parse(localStorage.getItem("checkoutPayment"));
if (!checkoutPayment) {
  window.location.href = "index.html";
}

function updateUI() {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  order__item__wrapper.innerHTML = "";

  basket?.forEach((item, index) => {
    const itemEl = item__from__cart.cloneNode(true);
    itemEl.querySelector(".item__name").textContent = item.name;
    itemEl.querySelector(".item__count").textContent = item.count;
    itemEl.querySelector(".item__price").textContent = formatePrice(
      item.price * item.count
    );
    order__item__wrapper.appendChild(itemEl);
  });
  const quantity = basket
    .map((item) => item.count)
    .reduce((itemCount, counter) => itemCount + counter, 0);
  cart__quntity.textContent = quantity;

  checkOutDatail();
}

function checkOutDatail() {
  let deliveryCost = 0;
  const basket = JSON.parse(localStorage.getItem("basket"));
  const totalPrice = basket.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  );
  const totalItem = basket.reduce((acc, item) => acc + item.count, 0);

  const totalPay = totalPrice + deliveryCost;

  document.querySelector("#total__item").textContent = totalItem
    .toString()
    .padStart(2, "0");
  document.querySelector("#total__price").textContent =
    formatePrice(totalPrice);
  document.querySelector("#total__pay").textContent = formatePrice(totalPay);
}

function getuserSlecectedBank() {
  const radios = document.getElementsByName("bank");
  let selectedValue;
  for (const radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  if (selectedValue) {
    return selectedValue;
  } else return false;
}

paybtn.addEventListener("click", (e) => {
  e.preventDefault();
  const checkoutPayment = JSON.parse(localStorage.getItem("checkoutPayment"));
  if (!checkoutPayment) {
    alert("سبد خرید شما خالی است");
    return false;
  }
  checkoutPayment.payByBank = getuserSlecectedBank();
  const date = new Date();
  console.log(date);
  localStorage.setItem(
    "order",
    JSON.stringify({
      checkoutPayment,
      usr: "09354082453",
      status: "success",
      orderDate: date,
      id: date.getTime(),
    })
  );
  window.location.href = "payment-status.html";
});

updateUI();
