import { formatePrice } from "./helper.js";
const cart__quntity = document.querySelector("#cart__quntity");
const stepPagesEl = document.querySelector(".step-pages");
const checkOutEl = document.querySelector(".check-out");
const empty__list__address = document.querySelector("#empty__list__address");
const addAddress = document.querySelectorAll(".add__Address");
const order__item__wrapper = document.querySelector("#order__item__wrapper");
const item__from__cart = document.querySelector("#item__from__cart").content;

const createdFormWrapper = document.querySelector(".created-address");
const cancelBtn = document.querySelector("#cancelBtn");

const updateUI = () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
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
};

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

addAddress.forEach((btn) => {
  btn.addEventListener("click", showForm);
});
function showForm() {
  createdFormWrapper.classList.add("active");
}
cancelBtn.addEventListener("click", (e) => resetForm(e));

// document.addEventListener("click", (e) => resetForm(e));

function resetForm(e) {
  const wrapperEl = createdFormWrapper.querySelector(".form-wrapper");
    createdFormWrapper.querySelector("form").reset();
    createdFormWrapper.classList.remove("active");
  
}
// updateUI for first render
updateUI();
