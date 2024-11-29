const swiper = new Swiper("#cm_slider", {
  // Optional parameters
  //   direction: "vertical",
  slidesPerView: "auto",
  //   centeredSlides: true,
  //   slidesPerView: 1,
  spaceBetween: 30,
//   loop: true,
  //   grabCursor: true,
  //   freeMode: true,
  // If we need pagination
  //   pagination: {
  //     el: ".swiper-pagination",
  //   },
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
  // Navigation arrows
  navigation: {
    nextEl: ".slider-btn.prev",
    prevEl: ".slider-btn.next",
  },

  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    992: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});
