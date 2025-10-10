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

document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      let icon = element.children[0];
      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);
        // アニメーションを実行
        const closingAnim = content.animate(
          closingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        icon.classList.toggle(IS_OPENED_CLASS);
        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);
        // アニメーションを実行
        const openingAnim = content.animate(
          openingAnimKeyframes(content),
          animTiming
        );
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        icon.classList.toggle(IS_OPENED_CLASS);
        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
};

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out",
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + "px", // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  },
  {
    height: 0,
    opacity: 0,
  },
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  },
  {
    height: content.offsetHeight + "px",
    opacity: 1,
  },
];
