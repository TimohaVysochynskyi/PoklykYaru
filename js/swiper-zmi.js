let swiper2 = new Swiper(".zmi-swiper1", {
  slidesPerView: 1,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
  },
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-zmi-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-zmi-next",
    prevEl: ".swiper-zmi-prev",
  },
});

let swiper3 = new Swiper(".zmi-swiper2", {
  slidesPerView: 2,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
  },
  grid: {
    rows: 2,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-zmi2-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-zmi2-next",
    prevEl: ".swiper-zmi2-prev",
  },
});