import data from "./data.js";
import { formatePrice } from "./helper.js";

const productsWrapper = document.querySelector("#products__wrapper");
const boxTemplate = document.querySelector("#box__template").content;
const baseUrl = window.location.protocol + "//" + window.location.host;

data.forEach((item) => {
  const box = boxTemplate.cloneNode(true);
  box.querySelector(".img > img").src = `./assets/${item.cover}`;
  box.querySelector(".box__link").href += `?id=${item.id}`;
  box.querySelector(".body > a").href += `?id=${item.id}`;
  box.querySelector(".body > a").innerHTML = `${item.productName}`;
  box.querySelector(".body > .price span").innerHTML = formatePrice(item.price); // format price
  // box.querySelector(".box__price").textContent = item.price;
  productsWrapper.appendChild(box);
});

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
