$(document).ready(() => {
  initFirstAnim();
  initHeader();
  initIntro();
  initScrollTriggers();
});

// ============================================================
//  first-anim　
// ============================================================

function initFirstAnim() {

  //　初回訪問時のみ発火 --------------------
  // const KEY = 'intro_seen_v1';

  // if (localStorage.getItem(KEY)) { // 2回目以降は即スキップ
  //   $('.js-top__opening').removeClass('is-active');
  //   $('.js-top__fv__inner').removeClass('is-active');
  //   $('.js-header').removeClass('is-appr');
  //   return; // ← この関数だけ抜ける。他は実行される
  // }
  // localStorage.setItem(KEY, '1'); // 既視フラグを立てる

  // 　スクロールの制御 --------------------
  $('.js-body').addClass('is-fixed');

  // 親 .js-top__opening 自身の「最後のアニメ」終了で解除
  $('.js-top__opening.is-active').on('animationend webkitAnimationEnd', function (e) {
    if (e.target !== this) return; // 親自身のイベント以外無視
    $(this).remove();
    $('.js-body').removeClass('is-fixed');
  });
}

// ============================================================
//  header
// ============================================================

function initHeader() {

  // ヘッダー背景追加（スクロール）
  // ------------------------------
  $(window).on('scroll', function () {
    const scroll = $(this).scrollTop();
    $('.js-header').toggleClass('is-scrolled', scroll > 1);
  });

  // ハンバーガーメニュー開閉
  // ------------------------------
  $('.js-hamburger').on('click', function () {
    $(this).toggleClass('is-open');
    $('.js-header__nav').toggleClass('is-open');
  });
}
// ============================================================
//  .p-top__intro
// ============================================================

function initIntro() {
  var doneSections = []; // 一度スクロールした要素を記録

  $(window).on('scroll', function() {
    $('.js-intro').each(function() {
      var $section = $(this);

      // すでに処理済みならスキップ
      if (doneSections.includes(this)) return;

      var rect = this.getBoundingClientRect();
      var triggerPoint = window.innerHeight * (2 / 3);
      // 画面の高さの2/3の位置（ここを超えたら発火）

      if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
        // スクロール実行
        this.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // 一度だけスクロールさせる
        doneSections.push(this);

        // このループを止める
        return false;
      }
    });
  });
}





// ============================================================
//  scrollTriger （gsap)
// ============================================================

function initScrollTriggers() {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.js-target').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      toggleClass: "is-active",
      once: true
    });
  });
}
