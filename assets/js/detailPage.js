import data from "./data.js";

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get("id");
  console.log(productId);

  // بارگذاری اطلاعات محصول بر اساس productId
  // اینجا می‌توانید از AJAX یا Fetch API برای دریافت اطلاعات محصول استفاده کنید
};
