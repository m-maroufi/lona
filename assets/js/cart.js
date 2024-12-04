import { formatePrice } from "./helper.js";

const cart__quntity = document.querySelector("#cart__quntity");
const cartListWrapper = document.querySelector("#cart__list__wrapper");
const cart__item__template = document.querySelector("#cart__item").content;
const stepPagesEl = document.querySelector(".step-pages");
const checkOutEl = document.querySelector(".check-out");
const emptyCart = document.querySelector("#emptyCart");
const removeAllBtn = document.querySelector("#removeAll");



const updateUI = () => {
  console.log("runn...");
  cartListWrapper.innerHTML = "";
  // update cart quantity
  const basket = localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [];
  const quantity = basket
    .map((item) => item.count)
    .reduce((itemCount, counter) => itemCount + counter, 0);
  cart__quntity.textContent = quantity;
  const localStorageTmp = JSON.parse(localStorage.getItem("basket"));

  if (basket.length > 0) {
     emptyCart.style.display = "none";
    basket.forEach((item) => {
      const itemEl = cart__item__template.cloneNode(true);
      itemEl.querySelector(".name").textContent = item.name;
      itemEl.querySelector("img").src = `./assets${item.cover}`;
      itemEl.querySelector(".color-box").style.background = item.color;
      itemEl.querySelector(".size-number").textContent = item.size;
      itemEl.querySelector(".price-number").textContent = formatePrice(
        item.price
      );
      itemEl.querySelector(".total-price").textContent = formatePrice(
        item.price * item.count
      );
      itemEl.querySelector("#count").value = item.count;
      if (item.count == 1) {
        itemEl.querySelector("#removeFromCart").style.display = "flex";
        itemEl.querySelector("#decrease").style.display = "none";
      }
      if (item.count > 1) {
        itemEl.querySelector("#removeFromCart").style.display = "none";
        itemEl.querySelector("#decrease").style.display = "flex";
      }
      // add eventlisner for btns
      itemEl.querySelectorAll("button").forEach((btn, index) => {
        btn.dataset.id = item.id;
        btn.addEventListener("click", clickHandler);
      });
      // // add eventlisner for btns
      // const btns = itemEl.querySelectorAll(".quntity button");
      // btns.forEach((btn) => {

      // });
      cartListWrapper.appendChild(itemEl);
    });
  } else {
    showingEmpty();
  }

  checkOutDatail();
};

function clickHandler(evnet) {
  const btnName = this.id;
  const itemId = this.dataset.id;
  console.log(btnName, itemId);

  if (btnName == "increase") {
    increaseHandler(itemId);
  }
  if (btnName == "decrease") {
    decreaseHandler(itemId);
  }
  if (btnName == "removeFromCart") {
    removeHandler(itemId);
  }
}

function increaseHandler(itemId) {
  if (findItemIsBasket(itemId)) {
    const item = findItemIsBasket(itemId);
    item.count++;
    updateBasket(item, "increase");
  }
}
function decreaseHandler(itemId) {
  if (findItemIsBasket(itemId)) {
    const item = findItemIsBasket(itemId);
    item.count--;
    updateBasket(item, "decrease");
  }
}
function removeHandler(itemId) {
  if (findItemIsBasket(itemId)) {
    const item = findItemIsBasket(itemId);
    updateBasket(item, "remove");
  }
}

function findItemIsBasket(id) {
  const basket = JSON.parse(localStorage.getItem("basket"));
  const item = basket.find((item) => item.id == id);
  return item;
}

function updateBasket(item, payload) {
  console.log(item.id);
  const basket = JSON.parse(localStorage.getItem("basket"));
  const ItemInBasket = basket.find((bas) => bas.id == item.id);
  if (ItemInBasket) {
    if (ItemInBasket.count < 10 && payload == "increase") {
      ItemInBasket.count = item.count;
    } else if (payload == "decrease") {
      ItemInBasket.count = item.count;
    } else if (payload == "remove") {
      const itemIndex = basket.findIndex((bs) => bs.id == item.id);
      if (itemIndex !== -1) {
        basket.splice(itemIndex, 1);
      }
    } else {
      alert("برای خرید بالا ده عدد با پشتبانی تماس بگیرید");
    }
  }
  localStorage.setItem("basket", JSON.stringify(basket));
  updateUI();
  // console.log("yess");
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
  // const totalPayWithTax = totalPay + totalPay * 0.15;
  // const totalPayWithTaxWithDiscount =
  //   totalPayWithTax - totalPayWithTax * (10 / 100);
  // const totalPayWithTaxWithDiscountWithVoucher =
  //   totalPayWithTaxWithDiscount - totalPayWithTaxWithDiscount * (5 / 100);
}

function showingEmpty() {
  stepPagesEl.style.display = "none";
  checkOutEl.style.display = "none";
  emptyCart.style.display = "flex";
}

removeAllBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  localStorage.removeItem("basket");
  updateUI();
})

// update ui for first rendering
updateUI();

