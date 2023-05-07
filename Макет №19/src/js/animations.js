if (window.matchMedia('(min-width: 1024px)').matches) {
  // Анимации на GSAP
  gsap.registerPlugin(ScrollTrigger);
  const tlMaster = gsap.timeline();

  // Анимация первой (приветственной) секции
  function animWelcome() {
    const tlWelcome = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.welcome',
        start: '-15% top',
        scrub: true,
      },
    }});
    tlWelcome
      .to('.welcome__title_bottom', {
        y: 80,
      })
      .to('.welcome__title_top', {
        y: 100,
      })
      .to('.welcome__title_note', {
        opacity: .5,
        y: 50,
      })
      .to('.welcome__action', {
        opacity: .3,
        y: 50,
      })
      .to('.welcome-slider', {
        y: -20
      });

    return tlWelcome;
  }

  // Анимация секции с описанием мастер-классов
  function animWhat() {
    const tlWhat = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.what',
        start: '-5% top',
        scrub: true,
      },
    }});
    tlWhat
      .to('.what__title', {
        y: 50,
      })
      .to('.what__subtitle', {
        y: 50,
      })
      .to('.what__text', {
        y: 60,
      })
      .to('.what .decor-image', {
        x: 20,
        y: 20,
      });

    return tlWhat;
  }

  // Анимация секции с процессом мастер-класса
  function animActions() {
    const tlActions = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.actions',
        start: '-20% top',
        scrub: true,
      },
    }});

    tlActions
      .to('.actions__title', {
        y: 50
      })
      .to('.action__slider', {
        y: 30,
      })

    return tlActions;
  }

  // Анимация секции с преимуществами
  function animPoints() {
    const tlPoints = gsap.timeline({ defaults: {
      scrollTrigger: {
        trigger: '.points',
        start: '-15% top',
        scrub: true
      }
    }});

    tlPoints.
      to('.points__title', {
        y: 80,
      })
      .to('.points-list .point', {
        y: 40,
      })
      .to('.points-list .point:nth-child(3n+1)', {
        y: 20,
      })

    return tlPoints;
  }

  // Анимация секции с героями
  function animHeroes() {
    const tlHeroes = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.heroes',
        start: '-10% top',
        scrub: true,
      },
    }});
    
    tlHeroes
      .to('.heroes__title', {
        y: 60
      })
      .to('.heroes__subtitle', {
        y: 10,
      })
      .to('.heroes__descr-text', {
        y: 15,
      })
      .to('.heroes__action', {
        y: 5,
      });

    return tlHeroes;
  }

  // Анимация секции с видео
  function animVideos() {
    const tlVideos = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.videos',
        start: '-10% top',
        scrub: true
      },
    }});

    tlVideos
      .to('.videos__title', {
        y: 50,
      });
      
      
    return tlVideos;
  }

  // Анимация секции с мероприятими
  function animEvents() {
    const tlEvents = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.events',
        start: '-30% top',
        scrub: true,
      }
    }});

    tlEvents
      .to('.events__title', {
        y: 80
      })
      .to('.events__line', {
        y: 45,
      })
      .to('.motivation__title', {
        y: 80,
      })
      .to('.motivation__text', {
        y: 0,
      })
      .to('.motivation__action-wrapper', {
        x: -30,
      })

    return tlEvents;
  }

  // Анимация секции с отзывами
  function animReviews() {
    const tlReviewsDecor = gsap.timeline({defaults: {
      scrollTrigger: {
        trigger: '.reviews',
        start: '-40% top',
        scrub: true,
      },
    }});  

    tlReviewsDecor
      .to('.reviews__bg_fly-1', {
        yPercent: -110
      })
      .to('.reviews__bg_fly-2', {
        yPercent: -200
      })
      .to('.reviews__bg_fly-3', {
        yPercent: -350
      })
      .to('.reviews__bg_fly-4', {
        xPercent: 150
      })
      .to('.reviews__bg_fly-5', {
        xPercent: 380
      })
      .to('.reviews__bg_fly-6', {
        yPercent: -30,
      })

    return tlReviewsDecor;
  }

  tlMaster.add(animWelcome());
  tlMaster.add(animWhat());
  tlMaster.add(animActions());
  tlMaster.add(animPoints());
  tlMaster.add(animHeroes());
  tlMaster.add(animVideos());
  tlMaster.add(animEvents());
  tlMaster.add(animReviews());
}