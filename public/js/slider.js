// Source - https://stackoverflow.com/a
// Posted by Tristanisginger
// Retrieved 2025-11-08, License - CC BY-SA 4.0

var swiperOptions = {
  loop: true,
  freeMode: true,
  spaceBetween: 25,
  grabCursor: true,
  slidesPerView: 'auto',
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false
  },

  freeMode: true,
  speed: 5000,
  freeModeMomentum: false
};

var swiper = new Swiper(".mySwiper", swiperOptions);

swiper.el.addEventListener('touchstart', () => {
  swiper.autoplay.start();
});