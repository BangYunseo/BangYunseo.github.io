// main.js - BangYunseo Project Site

// 스크롤 페이드인 애니메이션
function initFadeIn() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initFadeIn();
});
