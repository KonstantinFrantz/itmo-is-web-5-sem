document.addEventListener('DOMContentLoaded', () => {
  // Swiper initialization
  // Args: swiper class name, options json
  var swiper = new Swiper('.swiper', {
    slidesPerView: 1, // Number of videos per view
    navigation: {
      nextEl: '.swiper-button-next', // Next video button
      prevEl: '.swiper-button-prev', // Previous video button
    },
    pagination: {
      el: '.swiper-pagination', // Adding the pugination box
      clickable: true,          // Making pugination buttons clickable
    },
    grabCursor: true,     // Changing cursor to "grab" style
    touchAngle: 45,       // Changing angle to swipe
  });
});
