import data from "./data.js";
import { formatePrice } from "./helper.js";
const muinsToCart = document.querySelector("#muinsToCart");
const plusToCart = document.querySelector("#plusToCart");
const addToCart = document.querySelector("#addToCart");
const btnWrapper = document.querySelector(".btns-action");
const count = document.querySelector("#count");
const quantity = document.querySelector("#quantity");
const productDetail = document.querySelector(".product-detail");
const cart__quntity = document.querySelector("#cart__quntity");
const colorWrapper = document.querySelector(".inputs-radio.color");
const color__product = document.querySelector("#color__product").content;
const size__product = document.querySelector("#size__product").content;
const img__slide__product =
  document.querySelector("#side__big__slider").content;
const big__Slider__wrapper = document.querySelector("#big__Slider__wrapper");

const tumb__slide__wrapper = document.querySelector("#tumb__slide__wrapper");
// const tumb__slide = document.querySelector("#tumb__slide").content;
const sizeWrapper = document.querySelector(".sizes > .inputs-radio");

// basket data ;
const basket = localStorage.getItem("basket")
  ? JSON.parse(localStorage.getItem("basket"))
  : [];

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

  addToCart.setAttribute("data-id", productId);
  // created colors inputs

  product.colors.forEach((clr, index) => {
    const clrEl = color__product.cloneNode(true);
    clrEl.querySelector("label").style.setProperty("--clr", clr.code);
    clrEl.querySelector("label").setAttribute("for", `color-${clr.id}`);
    clrEl.querySelector("input").id = `color-${clr.id}`;
    clrEl.querySelector("input").value = clr.code;
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
      sizeElm.querySelector("input").value = size.name;
      sizeWrapper.appendChild(sizeElm);
    });
  }

  product.images?.forEach(({ src }) => {
    const imgEl = img__slide__product.cloneNode(true);
    const imgElement = imgEl.querySelector("img");
    const overlayElement = imgEl.querySelector(".overlay");

    imgElement.src = `/assets${src}`;
    overlayElement.textContent = product.brand;

    big__Slider__wrapper.appendChild(imgEl.cloneNode(true)); // Append a clone for big slider
    tumb__slide__wrapper.appendChild(imgEl); // Append the original for thumbnails
  });

 
  // add to baskets
  function getCheckedValue(name) {
    const radios = document.getElementsByName(name);
    let selectedValue;
    for (const radio of radios) {
      if (radio.checked) {
        selectedValue = radio.value;
        break;
      }
    }
    return selectedValue;
  }

  // check product in basket
  // افزودن محصول جدید به سبد خرید
  addToCart.addEventListener("click", (e) => {
    e.preventDefault();
    basket.push({
      id: product.id,
      name: product.productName,
      price: product.price,
      productCode: product.productCode,
      color: getCheckedValue("color"),
      size: getCheckedValue("size"),
      count: +count.value,
    });
    console.log(basket);
    updateCart();
  });

  // اپدیت کردن سبد خرید در صورت وجود و یا افزودن محصول جدید به سبد خرید
  const updateCart = () => {
    const quantity = basket
      .map((item) => item.count)
      .reduce((itemCount, counter) => itemCount + counter, 0);
    cart__quntity.textContent = quantity;
    localStorage.setItem("basket", JSON.stringify(basket));
    const localStorageTmp = JSON.parse(localStorage.getItem("basket"));
    let itemIsBasket = localStorageTmp.find((item) => item.id == productId);
    // اگر محصول در سبد خرید موجود باشد دکمه نمایش داده میشود
    if (itemIsBasket) {
      btnWrapper.innerHTML = ` <button class="toCarted">محصول در سبد خرید شما موجود است</button>`;
    }
  };
  updateCart();
  

  // حذف لودینگ اسکلتی از صفحه
   const skeleton = document.querySelectorAll(".Skeleton");
   skeleton.forEach((skeleton) => {
     skeleton.classList.remove("Skeleton");
   });

};

plusToCart.addEventListener("click", (e) => {
  e.preventDefault();
  const countValue = parseInt(count.value) + 1;
  count.value = countValue;
});
muinsToCart.addEventListener("click", (e) => {
  e.preventDefault();
  if (count.value > 1) {
    const countValue = parseInt(count.value) - 1;
    count.value = countValue;
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
