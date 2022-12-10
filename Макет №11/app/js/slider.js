// слайдер меню
$(".menu__line").slick({
  arrows: false,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1210,
      settings: {
        slidesToShow: 2
      },
    },

    {
      breakpoint: 670,
      settings: {
        slidesToShow: 1
      }
    }
  ]
})

// слайдер отзывов
$(".reviews__line").slick({
  arrows: false,
  dots: true,
  slidesToShow: 1,
  infinite: false,
})