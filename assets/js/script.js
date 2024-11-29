

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