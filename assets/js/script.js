import data from "./data.js";
import { comments } from "./comentsData.js";
import { formatePrice } from "./helper.js";
//
const productsWrapper = document.querySelector("#products__wrapper");
const boxTemplate = document.querySelector("#box__template").content;
const baseUrl = window.location.protocol + "//" + window.location.host;
const cart__quntity = document.querySelector("#cart__quntity");
const cm__boxTemplate = document.querySelector("#cm__box").content;

// ایجاد محصولات در صفحه اصلی
data.forEach((item) => {
  const box = boxTemplate.cloneNode(true);
  console.log(box);

  box.querySelector(".img > img").src = `./assets/${item.cover}`;
  box.querySelector(".box__link").href += `?id=${item.id}`;
  box.querySelector(".body > a").href += `?id=${item.id}`;
  box.querySelector(".body > a").innerHTML = `${item.productName}`;
  box.querySelector(".body > .price span").innerHTML = formatePrice(item.price); // format price
  // box.querySelector(".box__price").textContent = item.price;
  productsWrapper.appendChild(box);
});
// ایجاد ایونت کلیک در صفحه اصلی برای اسکرول خودکار به بخش مورد نظر
document.querySelectorAll(".nav-link").forEach((item) => {
  item.addEventListener("click", function (event) {
    // جلوگیری از رفتار پیش‌فرض لینک
    event.preventDefault();

    // اسکرول به بخش مورد نظر
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });

    // حذف کلاس اکتیو از تمام آیتم‌ها
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });

    // اضافه کردن کلاس اکتیو به آیتم کلیک شده
    this.classList.add("active");
  });
});
// تعداد  محصولات سبد خرید
const basket = JSON.parse(localStorage.getItem("basket")) || [];
const quantity =
  basket
    ?.map((item) => item.count)
    .reduce((itemCount, counter) => itemCount + counter, 0) || 0;
cart__quntity.textContent = quantity;

// add comments to ui

const comentsWrapper = document.querySelector("#comments__wrapper");

comments.forEach((cm) => {
  const cm__box = cm__boxTemplate.cloneNode(true);
  cm__box.querySelector("img").src = `./assets/${cm.authorImg}`;
  cm__box.querySelector("h4").textContent = cm.author;
  cm__box.querySelector(".cm-date").textContent = cm.date;
  cm__box.querySelector(".cm-body").textContent = cm.text;
  cm__box.querySelector(".cm-rate-number").textContent = cm.rate;
  comentsWrapper.appendChild(cm__box);
});
