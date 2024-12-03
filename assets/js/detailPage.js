import data from "./data.js";
import { formatePrice } from "./helper.js";
const muinsToCart = document.querySelector("#muinsToCart");
const addToCart = document.querySelector("#addToCart");
const count = document.querySelector("#count");
const quantity = document.querySelector("#quantity");
const productDetail = document.querySelector(".product-detail");

const colorWrapper = document.querySelector(".inputs-radio.color");
const color__product = document.querySelector("#color__product").content;
const size__product = document.querySelector("#size__product").content;
const img__slide__product =
  document.querySelector("#side__big__slider").content;
const big__Slider__wrapper = document.querySelector("#big__Slider__wrapper");

const tumb__slide__wrapper = document.querySelector("#tumb__slide__wrapper");
// const tumb__slide = document.querySelector("#tumb__slide").content;
const sizeWrapper = document.querySelector(".sizes > .inputs-radio");

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get("id");

  const product = data.find((product) => product.id === parseInt(productId));
  // if notfound product redirect to home page
  if (!product) {
    let homePageUrl = window.location.origin;
    window.location.href = homePageUrl;
    return;
  }

  // add product data to html
  productDetail.querySelector(".product-title > h1").textContent =
    product.productName;
  productDetail.querySelector(".pro-name").textContent =
    product.productFullName;
  productDetail.querySelector(".code span:last-child").textContent =
    product.productCode;
  productDetail.querySelector(".rate > span").textContent = product.rate;
  productDetail.querySelector(".pricing > span:first-child").textContent =
    formatePrice(product.price);

  // created colors inputs

  product.colors.forEach((clr, index) => {
    const clrEl = color__product.cloneNode(true);
    clrEl.querySelector("label").style.setProperty("--clr", clr.code);
    clrEl.querySelector("label").setAttribute("for", `color-${clr.id}`);
    clrEl.querySelector("input").id = `color-${clr.id}`;
    if (index == 1) {
      clrEl.querySelector("input").checked = true;
    }
    colorWrapper.appendChild(clrEl);
  });

  // created sizeinput elment

  if (product.size.length <= 0) {
    sizeWrapper.style.opacity = "0";
  } else {
    product.size?.forEach((size, index) => {
      const sizeElm = size__product.cloneNode(true);
      sizeElm.querySelector("label.radio-label-size").textContent = size.name;
      if (index == 0) {
        sizeElm.querySelector("input").checked = true;
      }
      sizeElm
        .querySelector("label.radio-label-size")
        .setAttribute("for", `size-${size.id}`);
      sizeElm.querySelector("input").id = `size-${size.id}`;
      sizeWrapper.appendChild(sizeElm);
    });
  }

  // image sider
  // product.images?.forEach((img) => {
  //   const imgEl = img__slide__product.cloneNode(true);
  //   imgEl.querySelector("img").src = `/assets${img.src}`;
  //   imgEl.querySelector(".overlay").textContent = `${product.brand}`;
  //   big__Slider__wrapper.appendChild(imgEl);
  //   tumb__slide__wrapper.appendChild(imgEl);
  //   console.log(tumb__slide__wrapper);
  // });

  product.images?.forEach(({ src }) => {
    const imgEl = img__slide__product.cloneNode(true);
    const imgElement = imgEl.querySelector("img");
    const overlayElement = imgEl.querySelector(".overlay");

    imgElement.src = `/assets${src}`;
    overlayElement.textContent = product.brand;

    big__Slider__wrapper.appendChild(imgEl.cloneNode(true)); // Append a clone for big slider
    tumb__slide__wrapper.appendChild(imgEl); // Append the original for thumbnails

    console.log(tumb__slide__wrapper);
  });

  const skeleton = document.querySelectorAll(".Skeleton");
  skeleton.forEach((skeleton) => {
    skeleton.classList.remove("Skeleton");
  });
  // بارگذاری اطلاعات محصول بر اساس productId
  // اینجا می‌توانید از AJAX یا Fetch API برای دریافت اطلاعات محصول استفاده کنید
};

addToCart.addEventListener("click", (e) => {
  e.preventDefault();
  const countValue = parseInt(count.value) + 1;
  count.value = countValue;
  console.log(count, countValue);
});
muinsToCart.addEventListener("click", (e) => {
  e.preventDefault();
  if (count.value > 1) {
    const countValue = parseInt(count.value) - 1;
    count.value = countValue;
    console.log(count, countValue);
    return true;
  }
  return false;
});

const bigImg = new Swiper("#tumb_swiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  //
});
const tumbImg = new Swiper("#detail__gallery", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-btn-next",
    prevEl: ".swiper-btn-prev",
  },
  thumbs: {
    swiper: bigImg,
  },
});
