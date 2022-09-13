let slidesPerView = 2;
let rows = 2;
if(window.screen.width > 968){
    slidesPerView = 2;
    rows = 2;
} else {
    slidesPerView = 1;
    rows = 1;
}
let swiper = new Swiper(".feedback-swiper", {
    slidesPerView: slidesPerView,
    /*autoplay: {
        delay: 15000,
        disableOnInteraction: false,
  },*/
  grid: {
    rows: rows,
  },
  spaceBetween: 30,
  pagination: {
    el: ".swiper-feedback-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-feedback-next",
    prevEl: ".swiper-feedback-prev",
  },
});