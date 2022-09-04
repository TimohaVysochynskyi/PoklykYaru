if (window.screen.width > 968) {
  let swiper2 = new Swiper(".zmi-swiper", {
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
} else { 
  let swiper2 = new Swiper(".zmi-swiper", {
    slidesPerView: 1,
    autoplay: {
      delay: 10000,
      disableOnInteraction: false,
    },
    grid: {
      rows: 1,
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
}