import data from "./data.js";
import { category } from "./categoryData.js";
import { formatePrice } from "./helper.js";
const productsWrapper = document.querySelector("#products__wrapper");
const boxTemplate = document.querySelector("#box__template").content;
const cart__quntity = document.querySelector("#cart__quntity");
window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  console.log(id);

  // تعداد محصولات سبد خرید
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const quantity = basket
    .map((item) => item.count)
    .reduce((itemCount, counter) => itemCount + counter, 0);
  cart__quntity.textContent = quantity;

  //   اگر ایدی فرستاده شده معتبر نباشد به صفحه اصلی ریدایرکت کن
  if (!id) {
    window.location.href = "index.html#categories";
    return;
  }
  //   بررسی و پیدا کردن دسته بندی و محصولات این دسته بندی
  const cat = category.filter((c) => c.id == id)[0];
  if (!cat) {
    window.location.href = "index.html#categories";
    return;
  }
  document.querySelector("#category").innerHTML = ` ${cat.name} `;
  //   get product with cat id
  const products = data.filter((p) => p.catId == id);
  if (products.length <= 0) {
    productsWrapper.innerHTML = ` <div class="noProduct">
              <img src="./assets/images/sorry.png" alt="" />
              <h4>متاسفایم در این دسته بندی محصولی وجود ندارد .</h4>
            </div>`;
    return;
  }
  //   render products
  // ایجاد محصولات در صفحه اصلی
  products.forEach((item) => {
    const box = boxTemplate.cloneNode(true);
    box.querySelector(".img > img").src = `./assets/${item.cover}`;
    box.querySelector(".box__link").href += `?id=${item.id}`;
    box.querySelector(".body > a").href += `?id=${item.id}`;
    box.querySelector(".body > a").innerHTML = `${item.productName}`;
    box.querySelector(".body > .price span").innerHTML = formatePrice(
      item.price
    ); // format price
    // box.querySelector(".box__price").textContent = item.price;
    productsWrapper.appendChild(box);
  });
};
