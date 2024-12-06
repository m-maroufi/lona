const wrapperStatus = document.querySelector(".status-wrapper");

window.onload = () => {
  const order = JSON.parse(localStorage.getItem("order"));
  if (!order) {
    window.location.href = "index.html";
  }
  if (order.status == "success") {
    localStorage.removeItem("checkoutPayment");
    localStorage.removeItem("basket");
    // localStorage.clear("cart");
    console.log(localStorage.getItem("addressList"));
    
    wrapperStatus.innerHTML = ` <div class="status success">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                class="status-icon"
              >
                <use
                  href="./assets/icons/icons-pack.svg#simple-line-icons--check"
                />
              </svg>
            </div>
            <p>پرداخت شما با موفقیت انجام شد!</p>
            <h5>
              <span> کد رهگیری :</span>
              <span id="order__success__Code">${order.id}</span>
            </h5>
            <a href="index.html" class="back">بازگــشت به خـــانه</a>
          </div>`;
    // localStorage.removeItem("cart");
  } else {
    wrapperStatus.innerHTML = ` <div class="status fail">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                class="status-icon"
              >
                <use
                  href="./assets/icons/icons-pack.svg#codicon--error"
                />
              </svg>
            </div>
            <p>پرداخت شما ناموفق بود!</p>
            <span
              >سفارش شما ثبت نشده و پرداخت شما به درستی انجام نشده است.</span
            >
            <h5>
              <span> کد رهگیری :</span>
              <span>${order.id}</span>
            </h5>
            <a href="index.html" class="back">بازگــشت به خـــانه</a>
          </div>`;
  }
};
