function initFirstAnim() {
  $(".js-body").addClass("is-fixed"),
    $(".js-top__opening.is-active").on(
      "animationend webkitAnimationEnd",
      function (i) {
        i.target === this &&
          ($(this).remove(), $(".js-body").removeClass("is-fixed"));
      }
    );
}
function initHeader() {
  $(window).on("scroll", function () {
    const i = $(this).scrollTop();
    $(".js-header").toggleClass("is-scrolled", i > 1);
  }),
    $(".js-hamburger").on("click", function () {
      $(this).toggleClass("is-open"),
        $(".js-header__nav").toggleClass("is-open");
    });
}
function initIntro() {
  var i = [];
  $(window).on("scroll", function () {
    $(".js-intro").each(function () {
      $(this);
      if (!i.includes(this)) {
        var t = this.getBoundingClientRect(),
          n = window.innerHeight * (2 / 3);
        return t.top <= n && t.bottom > n
          ? (this.scrollIntoView({ behavior: "smooth", block: "start" }),
            i.push(this),
            !1)
          : void 0;
      }
    });
  });
}
function initScrollTriggers() {
  gsap.registerPlugin(ScrollTrigger),
    document.querySelectorAll(".js-target").forEach((i) => {
      ScrollTrigger.create({
        trigger: i,
        start: "top 80%",
        toggleClass: "is-active",
        once: !0,
      });
    });
}
$(document).ready(() => {
  initFirstAnim(), initHeader(), initIntro(), initScrollTriggers();
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeTargets = document.querySelectorAll(".fadein");

  const options = {
    threshold: 0.1, // 10%見えたら発火
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-active");
        observer.unobserve(entry.target); // 一度きりでOKならこれ
      }
    });
  }, options);

  fadeTargets.forEach((target) => observer.observe(target));
});
