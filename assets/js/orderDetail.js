import { formatePrice } from "./helper.js";
import { ctitesData } from "./cities.js";
import { provice } from "./provice.js";
const cart__quntity = document.querySelector("#cart__quntity");
const stepPagesEl = document.querySelector(".step-pages");
const checkOutEl = document.querySelector(".check-out");
const empty__list__address = document.querySelector("#empty__list__address");
const addAddress = document.querySelectorAll(".add__Address");
const order__item__wrapper = document.querySelector("#order__item__wrapper");
const item__from__cart = document.querySelector("#item__from__cart").content;
const addressTemplate = document.querySelector("#address__template").content;
const empty__template = document.querySelector("#empty__template").content;
const addressListWrapper = document.querySelector("#address__list__wrapper");
const createdFormWrapper = document.querySelector(".created-address");
const cancelBtn = document.querySelector("#cancelBtn");

const prvSleEl = document.querySelector("#provinceSelect");
const countySelect = document.querySelector("#countySelect");
const goPayment = document.querySelector("#goPayment");

// // address list
const addressList = JSON.parse(localStorage.getItem("addressList")) || [];

const updateUI = () => {
  const basket = JSON.parse(localStorage.getItem("basket")) || [];
  const addressList = JSON.parse(localStorage.getItem("addressList")) || [];
  addressListWrapper.innerHTML = "";
  order__item__wrapper.innerHTML = "";
  if (addressList.length > 0) {
    addressList.forEach((item, index) => {
      console.log(item);
      const itemEl = addressTemplate.cloneNode(true);
      itemEl.querySelector("label").setAttribute("for", item.id);
      itemEl.querySelector("input").id = item.id;
      itemEl.querySelector("input").value = item.id;
      itemEl.querySelector(
        ".fullAddress__name"
      ).textContent = `${item.userProvince} , ${item.userCity} , ${item.userAddress}`;
      itemEl.querySelector(".address__user__name").textContent = item.userName;
      itemEl.querySelector(".phone__user").textContent = item.userPhone;
      itemEl.querySelector(".removeAddresBtn").setAttribute("data-id", item.id);
      itemEl.querySelector(".editAddressBtn").setAttribute("data-id", item.id);
      itemEl
        .querySelector(".removeAddresBtn")
        .addEventListener("click", (e) => {
          removeAddress(item.id);
        });
      addressListWrapper.appendChild(itemEl);
    });
  } else {
    const emptEl = empty__template.cloneNode(true);
    emptEl.querySelector(".add__Address").addEventListener("click", (e) => {
      showForm();
    });
    addressListWrapper.appendChild(emptEl);
  }

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

// show add new address formss
addAddress.forEach((btn) => {
  btn.addEventListener("click", showForm);
});
function showForm() {
  createdFormWrapper.classList.add("active");
}
cancelBtn.addEventListener("click", (e) => resetForm());
function resetForm() {
  const wrapperEl = createdFormWrapper.querySelector(".form-wrapper");
  createdFormWrapper.querySelector("form").reset();
  createdFormWrapper.classList.remove("active");
  createdFormWrapper
    .querySelectorAll(".error")
    .forEach((el) => (el.textContent = ""));
  createdFormWrapper
    .querySelectorAll("input,select")
    .forEach((el) => (el.style.borderColor = "var(--light-gray)"));
}

// get provice and set select option
function getProvice(params) {
  prvSleEl.innerHTML = `<option value="">-- انتخاب کنید --</option>`;
  const prov = provice;
  // اضافه کردن آیتم‌ها به تگ select
  prov.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.provinceId;
    option.textContent = item.provinceName;
    prvSleEl.appendChild(option);
  });
  countySelect.disabled = true;
}
// add country in selected El country
prvSleEl.addEventListener("change", addCountries);
function addCountries() {
  const provId = this.value;

  // Assuming citiesData is an array of city objects
  const citiesOfProv = ctitesData
    .filter((c) => c.provinceId == provId) // Filter cities based on the selected province ID
    .map((c) => ({ cityId: c.cityId, cityName: c.cityName })); // Map to an array of city objects
  countySelect.disabled = false;
  countySelect.innerHTML = `<option value="">-- انتخاب کنید --</option>`;
  citiesOfProv.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.cityId;
    option.textContent = item.cityName;
    countySelect.appendChild(option);
  });

  // console.log(citiesOfprov);
}
function getProviceWithId(id) {
  const prov = provice.find((item) => item.provinceId == id);
  return prov.provinceName;
}
function getcityWithId(cId, provId) {
  const city = ctitesData.find(
    (item) => item.cityId == cId && item.provinceId == provId
  );
  console.log(city);
  return city.cityName;
}
// validetion forms
function validateIranianMobileNumber(mobileNumber) {
  // الگوی شماره تلفن همراه ایران
  const regex = /^09\d{9}$/;
  // بررسی تطابق با الگو
  return regex.test(mobileNumber);
}
function checkSelectValue(selectBox) {
  const selectedValue = selectBox.value;

  if (selectedValue) {
    return selectedValue;
  } else {
    return false;
  }
}
function validatePostalCode(postalCode) {
  // الگوی ریجکس برای کد پستی ایران
  const pattern = /^\d{10}$/;
  // بررسی تطابق کد پستی با الگو
  return pattern.test(postalCode);
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", validationForm);

function setErr(el, errMsg) {
  const errEl = el.nextElementSibling;
  el.style.borderColor = "var(--red-clr)";
  errEl.textContent = errMsg;
}
function unSetErr(el) {
  const errEl = el.nextElementSibling;
  errEl.textContent = "";
  el.style.borderColor = "var(--light-gray)";
}
function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}
function validationForm() {
  const newAddressform = document.querySelector("#add__Address__form");
  const fullName = newAddressform.querySelector("#fullName");
  const phone = newAddressform.querySelector("#phone");
  const provice = newAddressform.querySelector("#provinceSelect");
  const city = newAddressform.querySelector("#countySelect");
  const address = newAddressform.querySelector("#fullAddress");
  const postalCode = newAddressform.querySelector("#postalCode");
  let err = false;
  if (fullName.value.length < 3) {
    setErr(fullName, "نام و نام خانوادگی باید حداقل 3 کاراکتر باشد");
    err = true;
  } else {
    unSetErr(fullName);
    err = false;
  }

  if (!validateIranianMobileNumber(phone.value)) {
    setErr(phone, "شماره تلفن با 09 شروع شود ");
    err = true;
  } else {
    unSetErr(phone);
    err == false;
  }

  if (!checkSelectValue(provice)) {
    setErr(provice, "لطفا استان محل سکونت را انتخاب کنید");
    err == true;
  } else {
    unSetErr(provice);
    err = false;
  }

  if (!checkSelectValue(city)) {
    setErr(city, "لطفا شهر محل سکونت را انتخاب کنید");
    err = true;
  } else {
    unSetErr(city);
    err = false;
  }

  if (address.value.length < 5) {
    setErr(address, "لطفا آدرس را به صورت دقیق و حداقل 5 کاراکتر وارد کنید");
    err = true;
  } else {
    unSetErr(address);
    err = false;
  }

  if (!validatePostalCode(postalCode.value)) {
    setErr(postalCode, "کد پستی باید 10 رقم باشد");
    err = true;
  } else {
    unSetErr(postalCode);
    err = false;
  }

  if (!err) {
    const addressUser = {
      id: generateUniqueId(),
      userName: fullName.value,
      userPhone: phone.value,
      userProvince: getProviceWithId(provice.value),
      userCity: getcityWithId(city.value, provice.value),
      userAddress: address.value,
      userPostalCode: postalCode.value,
    };
    createdAddressItem(addressUser);
  }
}
// set address item as list

function createdAddressItem(newAddress) {
  addressList.push(newAddress);
  localStorage.setItem("addressList", JSON.stringify(addressList));
  alert("آدرس جدید با موفقیت ثبت شد");
  updateUI();
  resetForm();
}

function removeAddress(id) {
  console.log(id);
  const index = addressList.findIndex((item) => item.id === id);
  if (index !== -1) {
    addressList.splice(index, 1);
    localStorage.setItem("addressList", JSON.stringify(addressList));
    updateUI();
  }
}

function getuserSlecectedAddress() {
  const radios = document.getElementsByName("order__address");
  let selectedValue;
  for (const radio of radios) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }
  const selectedAddress = addressList.find((item) => item.id == selectedValue);
  // console.log(selectedValue, selectedAddress);

  if (selectedAddress) {
    return selectedAddress;
  } else return false;
}

// go to paymants
goPayment.addEventListener("click", (e) => {
  e.preventDefault();
  if (addressList.length === 0 || !getuserSlecectedAddress()) {
    alert("لطفا آدرس خود انتخاب یا  وارد کنید");
    return;
  }
  const checkoutPayment = {
    cart: JSON.parse(localStorage.getItem("basket")),
    deliveryAddress: getuserSlecectedAddress(),
  };
  // console.log(checkoutPayment);
  localStorage.removeItem("checkoutPayment");
  localStorage.setItem("checkoutPayment", JSON.stringify(checkoutPayment));
  console.log(window.location.origin);
  window.location.href = "payment.html";
});

// updateUI for first render
// add provice in selected El provice
getProvice();
updateUI();
